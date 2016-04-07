/**
 * Created by pomy on 16/4/7.
 */

var path = require('path');

var extensions = ['','.js','.json'];

module.exports = {
    entry: path.resolve(__dirname, './demo/index.js'),

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'), //path for client visited
        publicPath: path.resolve(__dirname, './assets')  //path for server visited
    },

    //watching the entry files change
    watch: true,

    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
            //loaders: ['style', 'css']
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },

    resolve: {
        extensions: extensions
    }
};