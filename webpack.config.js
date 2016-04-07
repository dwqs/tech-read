/**
 * Created by pomy on 16/4/7.
 */

var path = require('path');
var webpack = require("webpack");

var extensions = ['','.js','.json'];

module.exports = {
    entry: path.resolve(__dirname, './demo/index.js'),
    // entry: {
    //     index: './demo/index.js'   可以有多个入口文件
    // },

    output: {
        //filename: '[name].[chunkhash].js',  chunkhash<==>hash  二者不同时使用
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'), //webpack打包后存放的绝对路径
        publicPath: path.resolve(__dirname, './assets')  //webpack打包后在服务器上的路径
    },

    //监听文件  webpack --watch
    watch: true,

    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: "eslint-loader?{rules:{semi:0}}",
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.css$/,
            loader: 'style!css'
            //loaders: ['style', 'css']
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel'
        }]
    },

    eslint: {
        failOnWarning: false,
        failOnError: true
    },

    resolve: {
        extensions: extensions
    },

    plugins: [
        new webpack.optimize.DedupePlugin()  //避免重复打包
        //new webpack.optimize.UglifyJsPlugin()  压缩
    ]
};