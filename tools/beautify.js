const fs = require('fs')
const pathModule = require('path')
const UglifyJS = require('uglify-js')
const { js_beautify, css_beautify } = require('js-beautify')
const { execSync } = require('child_process')
const mkdirp = require('mkdirp')

// const source = fs.readFileSync('src/models/tag.js', 'utf8')
const source = `
var a = function() {
	  return (c, b), a
  }
`

const foo = fs.readFileSync('./raw/owl-web-bd7286df4ef3347517507cddca808701.js', 'utf8')

const bar = js_beautify(foo, { indent_size: 2 })

const idx = bar.indexOf('{')

const injection = 'console.log(JSON.stringify(Object.entries(t).map(([id,[fn,deps]])=>({id:Number(id),source:fn.toString(),deps:deps})))); return;\n'

fs.writeFileSync('./flowdock.js', bar.slice(0, idx + 1) + injection + bar.slice(idx + 1))

const output = execSync('node ./flowdock.js')

const modules = JSON.parse(output)

const node2statement = (node) => {
	if (node.TYPE == 'SimpleStatement' || node instanceof UglifyJS.AST_Statement) {
		return node
	}
	return new UglifyJS.AST_SimpleStatement({body: node})
}

const beautify = (source) => {
	const ast = UglifyJS.parse(source);

	const last = a => a[a.length - 1]

	const indent = (n) => {
		let ret = ''
		for (let i = 0; i < n; i++) {
			ret += '  '
		}
		return ret
	}

	let depth = 0
	const inspector = new UglifyJS.TreeWalker((node, descend) => {
		let extra = ''
		switch (node.TYPE) {
			case 'Binary':
				extra = node.operator
				break
		}
		console.log(indent(depth) + node.TYPE, extra)
		depth += 1
		descend()
		depth -= 1
		return true
	})

	const walker = new UglifyJS.TreeWalker((node, descend) => {
		if (node.TYPE === 'Assign' && node.left.TYPE === 'Dot' && node.right.TYPE === 'Call') {
			if (node.right.TYPE === 'Call' && node.right.expression.TYPE === 'Function') {
				const ret = node.right.expression.body[node.right.expression.body.length - 1]
				if (ret.TYPE === 'Return' && ret.value.TYPE === 'Sequence') {
					const last = ret.value.expressions[ret.value.expressions.length - 1]
					if (last.TYPE === 'SymbolRef') {
						last.thedef.name = node.left.property
					}
				}
			}
		}
	})

	const sequenceTransformer = new UglifyJS.TreeTransformer(function (node, descend) {
		// Eliminate spurious blocks
		if (node instanceof UglifyJS.AST_Block) {
			// TODO: check scopes when merging blocks
			let body = []
			for (const child of node.body.map(n => n.transform(this))) {
				if (child instanceof UglifyJS.AST_BlockStatement) {
					body = body.concat(child.body)
				} else if (child.TYPE === 'SimpleStatement' && child.body instanceof UglifyJS.AST_SimpleStatement) {
					body.push(child.body)
				} else if (child.TYPE === 'SimpleStatement' && child.body instanceof UglifyJS.AST_BlockStatement) {
					body = body.concat(child.body.body)
				} else if (child.TYPE === 'SimpleStatement' && child.body instanceof UglifyJS.AST_Sequence) {
					const block = new UglifyJS.AST_BlockStatement({
						body: child.body.expressions.map(e => new UglifyJS.AST_SimpleStatement({ body: e }))
					})
					body = body.concat(block.transform(this).body)
				} else {
					body.push(child)
				}
			}
			node.body = body
			return node
		}

		if (node.TYPE === 'SimpleStatement' && node.body.TYPE === 'SimpleStatement') {
			return node.body.transform(this)
		}

		if (node.TYPE === 'SimpleStatement' && node.body.TYPE === 'Sequence') {
			node = new UglifyJS.AST_BlockStatement({
				body: node.body.expressions.map(e => new UglifyJS.AST_SimpleStatement({ body: e }))
			})
			return node.transform(this)
		}

		// { foo && bar } -> { if (foo) { bar } }
		if (node.TYPE === 'Binary' && node.operator === '&&' && (this.parent() instanceof UglifyJS.AST_Block || this.parent() instanceof UglifyJS.AST_SimpleStatement)) {
			node = new UglifyJS.AST_If({
				condition: node.left,
				body: new UglifyJS.AST_BlockStatement({ body: [ node.right ] })
			})
			return node.transform(this)
		}
		
		// return a ? b : c -> { if (a) { return b } return c }
		if (node instanceof UglifyJS.AST_Return && node.value && node.value.TYPE === 'Conditional') {
			const conditional = new UglifyJS.AST_If({
				condition: node.value.condition,
				body: new UglifyJS.AST_BlockStatement({ body: [ new UglifyJS.AST_Return({ value: node.value.consequent }) ] }),
			})
			const ret = new UglifyJS.AST_Return()

			const body = [ conditional, ret ]
			
			if (!(node.value.alternative.TYPE === 'UnaryPrefix'
				  && node.value.alternative.operator === 'void'
				  && node.value.alternative.expression.TYPE === 'Number'
				  && node.value.alternative.expression.value === 0)) {
				ret.value = node.value.alternative
			}

			node = new UglifyJS.AST_BlockStatement({ body: body })
			return node.transform(this)
		}

		// return a, b, c, d -> { a; b; c; return d; }
		if (node instanceof UglifyJS.AST_Exit && node.value && node.value.TYPE === 'Sequence') {
			const value = node.value.expressions.pop()
			const body = node.value.expressions.map(e => new UglifyJS.AST_SimpleStatement({body: e}))
			body.push(node)
			node.value = value
			node = new UglifyJS.AST_BlockStatement({ body: body })
			return node.transform(this)
		}

		// while (foo) bar -> while (foo) { bar }
		if (node instanceof UglifyJS.AST_StatementWithBody
			&& node.TYPE !== 'LabeledStatement'
			&& node.body.TYPE !== 'BlockStatement') {
			node.body = new UglifyJS.AST_BlockStatement({body: [ node2statement(node.body) ]})
			return node.transform(this)
		}

		// if (a) { b } else bar -> if (a) { b } else { bar }
		if (node instanceof UglifyJS.AST_If && node.alternative && node.alternative.TYPE !== 'BlockStatement' && node.alternative.TYPE !== 'If') {
			node.alternative = new UglifyJS.AST_BlockStatement({body: [ node2statement(node.alternative) ]})
			return node.transform(this)
		}

		// if (a, b, c, d) { ... } -> { a; b; c; if (d) { ... } }
		if (node instanceof UglifyJS.AST_If && node.condition.TYPE === 'Sequence') {
			const condition = node.condition.expressions.pop()
			const body = node.condition.expressions.map(e => new UglifyJS.AST_SimpleStatement({body: e}))
			node.condition = condition
			body.push(node)

			node = new UglifyJS.AST_BlockStatement({body: body })
			return node.transform(this)
		}
		// if (a ? b : void 0) { ... } -> if (a && b) { ... }
		if (node instanceof UglifyJS.AST_If && node.condition.TYPE === 'Conditional'
			&& node.condition.alternative.TYPE === 'UnaryPrefix'
			&& node.condition.alternative.operator === 'void'
			&& node.condition.alternative.expression.TYPE === 'Number'
			&& node.condition.alternative.expression.value === 0) {
				node.condition = new UglifyJS.AST_Binary({ operator: '&&', left: node.condition.condition, right: node.condition.consequent })
				return node.transform(this)
		}

		// a ? b : c -> if (a) { b } else { c }
		if (node instanceof UglifyJS.AST_SimpleStatement && node.body.TYPE === 'Conditional') {
			node = new UglifyJS.AST_If({
				condition: node.body.condition,
				body: node2statement(node.body.consequent),
				alternative: node2statement(node.body.alternative)
			})
			return node.transform(this)
		}

		// if null && foo -> foo && null
		if (node instanceof UglifyJS.AST_Binary
			&& [ '<', '<=', '==', '===', '!=', '>=', '>' ].includes(node.operator)
			&& node.left.is_constant() 
			&& !node.right.is_constant()) {
			const opMap = {
				'<': '>',
				'<=': '>=',
				'>': '<',
				'>=': '<='
			}
			const op = opMap[node.operator] || node.operator

			const left = node.left
			node.left = node.right
			node.right = left
			node.operator = op
			return node.transform(this)
		}
	})

	ast.figure_out_scope()

	// ast.walk(inspector)
	ast.walk(walker)
	const ast2 = ast.transform(sequenceTransformer)
	const moduleFn = ast2.body[0].definitions[0].value
	moduleFn.argnames[0].thedef.name = 'require'
	moduleFn.argnames[1].thedef.name = 'module'
	moduleFn.argnames[2].thedef.name = 'exports'
	const result = new UglifyJS.AST_Toplevel({
		body: moduleFn.body
	})
	// return ast2.print_to_string({ beautify: true })
	return result.print_to_string({ beautify: true })
}

// console.log(beautify(source))
// process.exit()

const writtenFiles = {};

const main = modules[0]

const npmPackages = {}

const indent = (n) => {
	let space = ''
	for (let i = 0; i < n; i++) {
		space += '  '
	}
	return space
}

const writeModule = (modulePath, module, level=0) => {
	const filename = pathModule.basename(modulePath) + '.js'
	const dirPath = pathModule.normalize(pathModule.dirname(modulePath))
	const fullPath = pathModule.join('./src/js', dirPath, filename)

	if (!writtenFiles[fullPath]) {
		console.log(indent(level), fullPath)
		writtenFiles[fullPath] = true
		mkdirp.sync(pathModule.join('./src/js', dirPath))
		fs.writeFileSync(fullPath, beautify('var module = ' + module.source) + '\n')

		if (modulePath.endsWith('mustache')) {
			const template = require('../' + fullPath)
			console.log(indent(level), fullPath.slice(0, -3))
			fs.writeFileSync(fullPath.slice(0, -3), template.text)
			fs.unlinkSync(fullPath)
		}
	}

	for (let [ foo, id ] of Object.entries(module.deps)) {
		if (!foo.startsWith('.')) {
			if (foo.split('/').length === 1 || foo[foo.length - 1] === '/') {
				writeModule('../vendor/' + foo + '/index', modules[id-1], level + 1)
			} else {
				writeModule('../vendor/' + foo, modules[id-1], level + 1)
			}
		} else {
			if (foo[foo.length - 1] === '/') {
				writeModule(pathModule.join(dirPath, foo, 'index'), modules[id-1], level + 1)
			} else {
				writeModule(pathModule.join(dirPath, foo), modules[id-1], level + 1)
			}
		}
	}
}

writeModule('./index', main)
for (const module of Object.keys(npmPackages)) {
	console.log(module)
}

console.log('Beautifying CSS')

const cssSource = fs.readFileSync('./raw/owl-374418fe96b3f464c6cba39928deae62.css', 'utf8')

fs.writeFileSync('./src/css/style.css', css_beautify(cssSource, { indent_size: 4 }) + '\n')
