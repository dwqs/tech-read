/**
 * Created by pomy on 16/4/8.
 */

'use strict';

var request = require('request');

var render = require('./render');

function* index () {
    this.response.body = yield render('index');
}

function* toutiao() {
    this.response.set("Content-Type", "text/plain;charset=utf-8");

    let reponseBody = '404 not found';
    let resBody = request('http://toutiao.io/', (error, response, body) => {
        if(!error && response.statusCode == 200){
            return body;
        } else {
            return reponseBody;
        }
    });
    this.body = resBody;
}

exports.register = function (router) {
    router.get('/', index);
    router.get('/index', index);
    router.get('/toutiao', toutiao);
};