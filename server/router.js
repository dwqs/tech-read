/**
 * Created by pomy on 16/4/8.
 */

'use strict';

let request = require('request');
//let coRequest = require('co-request');

let render = require('./render');
let requestPromise = require('./lib');

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

    /**
     *  异步请求同步: Generator 和 Promise
     *  用 request 请求时,没法同步,但可以用 Promise封装了,见 requestPromise
     *  另外就是利用 co-request 看了源码后 也是用 Promise 进行 polyfill
     *  let result = yield coRequest(origin);
        url = result.client._httpMessage._headers.host + result.client._httpMessage.path;
     *  另一个点是 yield 后只能跟 promise/generator等 跟普通的Object会报错
     */
    // let result = yield coRequest(origin);
    // url = result.client._httpMessage._headers.host + result.client._httpMessage.path;
    let url = yield requestPromise(origin).then((path) => {
        return path;
    });
    this.body = JSON.stringify({
        url: url
    });
}

function* geek () {
    this.response.set("Content-Type", "text/plain;charset=utf-8");

    let resBody = request('http://geek.csdn.net/', (error, response, body) => {
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
    router.get('/toutiao/article', toutiaoArticle);
    router.get('/geek', geek)
};