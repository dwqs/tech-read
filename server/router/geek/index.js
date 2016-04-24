/**
 * Created by pomy on 4/25/16.
 */

'use strict';

let $ = require('cheerio');
//let coRequest = require('co-request');

let requestPromise = require('../../lib');

function* geek () {
    this.response.set("Content-Type", "text/plain;charset=utf-8");

    let resBody = yield requestPromise.parseBody('http://geek.csdn.net/').then((body) => {
        return body;
    });

    this.body = resBody;
}

module.exports.register = (router) => {
    router.get('/geek', geek);
};