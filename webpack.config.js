/**
 * Created by pomy on 16/4/7.
 */

var path = require('path');

var extensions = ['','.js','.json'];

module.exports = {
    entry: path.resolve(__dirname, './demo/index.js'),

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: path.resolve(__dirname, './assets')
    },

    resolve: {
        extensions: extensions
    },

    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            babel: {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel?optional[]=runtime&loose=all'
            }
        }]
    }
};