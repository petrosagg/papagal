const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
				from: 'raw/owl-globals-239ae89a2c9995e21675bb37d0a1a3cb.js',
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
		path: path.resolve(__dirname, 'dist/chromium'),
		filename: 'resources/bundle.js'
	}
};
