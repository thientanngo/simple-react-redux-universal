import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import Package from './package.json';

export default {
    devtool: 'source-map',
    target: 'node',
    entry: {
        index: ['./sources/server']
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'server')
    },
    plugins: [
        new webpack.DefinePlugin({
            __CLIENT__: false,
            __SERVER__: true,
            __PRODUCTION__: true,
            __DEV__: false,
            __VERSION__: JSON.stringify(Package.version),
            __APPNAME__: JSON.stringify(Package.name),
            __API_URL__: JSON.stringify('https://tiki.vn/ajax'),
            __API_KEY__: JSON.stringify('test'),
            __COOKIE_KEY__: JSON.stringify('abcd1234')
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
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
    },
    externals: fs.readdirSync('node_modules').reduce(function(accumulator, module) {
        accumulator[module] = 'commonjs ' + module;
        return accumulator;
    }, {})
};
