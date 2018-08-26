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
				from: 'raw/owl-globals-118594c05279534c83906b1b57bbc092.js',
				to: 'resources/',
				flatten: true
			},
			{
				from: 'src/extension/*',
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
		path: path.resolve(__dirname, 'dist'),
		filename: 'resources/bundle.js'
	}
};
