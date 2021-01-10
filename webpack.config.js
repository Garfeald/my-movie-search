const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dotenv = require('dotenv');

module.exports = () => {
	const env = dotenv.config().parsed;

	const envKeys = Object.keys(env).reduce((prev, next) => {
		prev[`process.env.${next}`] = JSON.stringify(env[next]);
		return prev;
	}, {});
	return {
		entry: './src/index.js',
		output: {
			path: path.join(__dirname, '/dist'),
			filename: 'bundle.js',
			publicPath: '',
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: 'babel-loader',
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
				},
			],
		},
		devServer: {
			port: 3000,
			historyApiFallback: true,
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: './public/index.html',
			}),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin(envKeys),
		],
		mode: 'production',
		optimization: {
			minimize: process.env.NODE_ENV !== 'development',
			splitChunks: {
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendor',
						chunks: 'all',
					},
				},
			},
		},
	};
};
