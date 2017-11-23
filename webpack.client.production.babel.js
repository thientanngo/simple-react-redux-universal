import path from 'path';
import webpack from 'webpack';
import ModernizrPlugin from 'modernizr-webpack-plugin';
import ModernizrConfig from './modernizr.webpack';
import Package from './package.json';
import Vendor from './vendor.json';

export default {
		devtool: 'source-map',
		entry: {
				client: [
						'./sources/client'
				],
				vendor: Vendor
		},
		output: {
				filename: '[name].js',
				path: path.join(__dirname, 'public/dist')
		},
		plugins: [
				new webpack.DefinePlugin({
						__CLIENT__: true,
						__SERVER__: false,
						__PRODUCTION__: true,
						__DEV__: false,
						__VERSION__: JSON.stringify(Package.version),
						__APPNAME__: JSON.stringify(Package.name)
				}),
				new webpack.optimize.DedupePlugin(),
				new webpack.optimize.OccurenceOrderPlugin(),
				new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
				new webpack.optimize.UglifyJsPlugin({
						compress: {
								warnings: false
						}
				}),
				new ModernizrPlugin(ModernizrConfig),
				new webpack.ExtendedAPIPlugin(),
				new webpack.DefinePlugin({
						'process.env': {
								NODE_ENV: JSON.stringify('production')
						}
				})
		],
		module: {
				preLoaders: [{
						exclude: /node_modules/,
						loader: 'eslint-loader',
						test: /\.js?$/
				}],
				postLoaders: [{
						exclude: /node_modules/,
						loader: 'babel-loader',
						test: /\.js?$/
				}],
				loaders: [{
						test: /jquery\.js$/,
						loader: 'expose?jQuery!expose?$'
				}, {
						test: /\.scss$/,
						loaders: [
								'isomorphic-style-loader',
								'css-loader?modules&camelCase&-url&localIdentName=[hash:base64]',
								'postcss-loader',
								'sass-loader'
						]
				}, {
						test: /\.css$/,
						loaders: [
								'isomorphic-style-loader',
								'css-loader?modules&camelCase&-url&localIdentName=[hash:base64]',
								'postcss-loader'
						]
				}]
		},
		postcss: (bundler) => {
				return [
						require('postcss-import')(),
						require('postcss-custom-properties')(),
						require('postcss-calc')(),
						require('postcss-nesting')(),
						require('postcss-flexbugs-fixes')(),
						require('autoprefixer')()
				];
		},
		resolve: {
				root: [
						path.resolve('./sources')
				]
		}
};
