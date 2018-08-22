const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	resolve: {
		modules: ['src/vendor', 'node_modules']
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	}
};
