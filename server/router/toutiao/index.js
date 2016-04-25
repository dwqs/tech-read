/**
 * Created by pomy on 4/25/16.
 */

'use strict';

let $ = require('cheerio');
//let coRequest = require('co-request');

let requestPromise = require('../../lib');

function* toutiao() {
    // let resBody = request('http://toutiao.io/', (error, response, body) => {
    //     if(!error && response.statusCode == 200){
    //         return body;
    //     } else {
    //         return reponseBody;
    //     }
    // });
    this.response.set("Content-Type", "application/json;charset=utf-8");

    let resBody = yield requestPromise.parseBody('http://toutiao.io/').then((body) => {
        return body;
    });

    let lists = $(resBody).find('.posts').first().children('.post');

    let toutiaoPrevLists = lists.map((index, list) => {
        let titleObj = $(list).find('.title');
        let title = titleObj.text();
        let originUrl = titleObj.children('a').attr('href');
        let meta = $(list).find('.meta')[0].firstChild.nodeValue;;
        let avatarUrl = $(list).find('img').attr('src');;
        let subjectUrl = $(list).find('.subject-name a').attr('href');
        let subjectOriginUrl = `http://toutiao.io${subjectUrl}`;
        let subjectText = $(list).find('.subject-name a').text();

        return {
            listTitle:title,
            listOriginUrl: originUrl,
            listMeta: meta,
            listAvatarUrl: avatarUrl,
            listSubjectUrl: subjectOriginUrl,
            listSubjectText: subjectText
        };
    });

    let arr = [];

    for (let i = 0, len = toutiaoPrevLists.length; i < len; i++) {
        arr.push(toutiaoPrevLists[i]);
    }

    this.response.body = {
        postLists:arr
    };
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
    let url = yield requestPromise.parseUrl(origin).then((path) => {
        return path;
    });
    this.body = JSON.stringify({
        url: url
    });
}

function* toutiaotPrev () {
    this.response.set("Content-Type", "application/json;charset=utf-8");

    let prevUrl = this.request.get('x-custom-header');

    let resBody = yield requestPromise.parseBody(prevUrl).then((body) => {
        return body;
    });

    let lists = $(resBody).find('.post');

    let toutiaoPrevLists = lists.map((index, list) => {
        let titleObj = $(list).find('.title');
        let title = titleObj.text();
        let originUrl = titleObj.children('a').attr('href');
        let meta = $(list).find('.meta')[0].firstChild.nodeValue;
        let avatarUrl = $(list).find('img').attr('src');
        let subjectUrl = $(list).find('.subject-name a').attr('href');
        let subjectOriginUrl = `http://toutiao.io${subjectUrl}`;
        let subjectText = $(list).find('.subject-name a').text();

        return {
            listTitle:title,
            listOriginUrl: originUrl,
            listMeta: meta,
            listAvatarUrl: avatarUrl,
            listSubjectUrl: subjectOriginUrl,
            listSubjectText: subjectText
        };
    });

    let arr = [];

    for (let i = 0, len = toutiaoPrevLists.length; i < len; i++) {
        arr.push(toutiaoPrevLists[i]);
    }

    this.response.body = {
        postLists:arr
    };
}

module.exports.register = (router) => {
    router.get('/toutiao', toutiao);
    router.get('/toutiao/article', toutiaoArticle);
    router.get('/toutiao/prev', toutiaotPrev)
};