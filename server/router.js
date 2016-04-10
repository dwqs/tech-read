/**
 * Created by pomy on 16/4/8.
 */

'use strict';

var request = require('request');

var render = require('./render');

let reponseBody = '404 not found';

function* index () {
    this.response.body = yield render('index');
}

function* toutiao() {
    this.response.set("Content-Type", "text/plain;charset=utf-8");

    let resBody = request('http://toutiao.io/', (error, response, body) => {
        if(!error && response.statusCode == 200){
            return body;
        } else {
            return reponseBody;
        }
    });

    this.body = resBody;
}

function* toutiaoArticle() {
    this.response.set("Content-Type", "application/json;charset=utf-8");

    let origin = this.request.get('x-custom-header');
    let url = '';

    request.get(origin).on('response', (res) => {
        console.log('qqqq',res.client._httpMessage.path,res.client._httpMessage._headers.host);
        url = res.client._httpMessage._headers.host + res.client._httpMessage.path;
        console.log('ssss',url);
    });

    this.body = JSON.stringify({
        url: url
    });
}

exports.register = function (router) {
    router.get('/', index);
    router.get('/index', index);
    router.get('/toutiao', toutiao);
    router.get('/toutiao/article',toutiaoArticle);
};