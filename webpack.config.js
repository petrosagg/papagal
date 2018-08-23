const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	mode: 'development',
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
				from: 'src/extension/*',
				to: './',
				flatten: true
			},
			{
				from: 'src/css/style.css',
				to: './'
			}
		])
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	}
};
