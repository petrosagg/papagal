const path = require('path');

module.exports = {
	entry: './src/index.js',
	resolve: {
		modules: ['src/vendor', 'node_modules']
	},
	optimization: {
		// We no not want to minimize our code.
		minimize: false
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	}
};
