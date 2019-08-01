const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const rmrfSync = (p) => {
    if (fs.existsSync(p)) {
        if(fs.lstatSync(p).isDirectory()) {
            for (const file of fs.readdirSync(p)) {
                rmrfSync(path.join(p, file));
            }
            fs.rmdirSync(p);
        } else {
            fs.unlinkSync(p);
        }
    }
}

const OUTPUT_PATH = path.resolve(__dirname, 'dist/chromium');

rmrfSync(OUTPUT_PATH);

module.exports = {
	mode: 'production',
	entry: './src/js/index.js',
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
	plugins: [
		new CopyWebpackPlugin([
			{
				from: 'raw/jquery-79df507d65fd38a3fb7d06c48c670ca3.js',
				to: 'resources/',
				flatten: true
			},
			{
				from: 'raw/owl-globals-33312482ebc39a1659e8bfff0033770d.js',
				to: 'resources/',
				flatten: true
			},
			{
				from: 'src/extension/chromium/*',
				to: '',
				flatten: true
			},
			{
				from: 'src/css/style.css',
				to: 'resources/'
			}
		])
	],
	output: {
		path: OUTPUT_PATH,
		filename: 'resources/bundle.js'
	}
};
