const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	resolve: {
		modules: ['src/vendor', 'node_modules']
	},
	module: {
		rules: [
			{
				test: /\.mustache$/,
				loader: 'mustache-loader?noShortcut'
			}
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	}
};
