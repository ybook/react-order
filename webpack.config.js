var path = require('path');
module.exports = {
	devtool:"source-map",
	entry: {
		index:path.resolve(__dirname, "./index.js"),
		serve:path.resolve(__dirname, "./serve.js")
	},
	output: {
		filename: '[name].js',
		//输出之后的文件路径 必须是绝对路径
		path: __dirname + "/public"
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel-loader',
			exclude: /(node_modules|bower_components)/,
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.scss$/,
			loader: 'style-loader!css-loader!sass-loader'
		}]
	},
	devServer: {
		contentBase: "./public",
		inline: true,
		port: 1111
	}
}