/**
 * Created by pomy on 4/25/16.
 */

'use strict';

let $ = require('cheerio');
//let coRequest = require('co-request');

let lib = require('../../lib');

function* geek () {
    let resBody = yield lib.parseBody('http://geek.csdn.net/').then((body) => {
        return body;
    });

    let lists = $(resBody).find('#geek_list').children('.geek_list');

    let geekLists = lists.map((index, list) => {
        let titleObj = $(list).find('.tracking-ad .title');
        let title = titleObj.text();
        let originUrl = titleObj.attr('href');
        let meta = $(list).find('.list-inline a')[0].firstChild.nodeValue;
        let avatarUrl = $(list).find('img').attr('src');
        let subjectUrl = $(list).find('.list-inline a').length === 1 ? $(list).find('.list-inline a').attr('href') : $(list).find('.list-inline a').last().attr('href');
        let subjectText = $(list).find('.list-inline a').length === 1 ? $(list).find('.list-inline a').text() : $(list).find('.list-inline a').last().text();

        return {
            listTitle:title,
            listOriginUrl: originUrl,
            listMeta: meta,
            listAvatarUrl: avatarUrl,
            listSubjectUrl: subjectUrl,
            listSubjectText: subjectText
        };
    });

    let arr = lib.listToArr(geekLists);

    this.response.body = {
        postLists:arr
    };
}

function* geekPrev() {
    let from = this.request.get('x-custom-header');
    let url = `http://geek.csdn.net/service/news/get_news_list?size=20&from=${from}`;

    let resBody = yield lib.parseBody(url).then((body) => {
        return JSON.parse(body);
    });

    let container = $('<div></div>');
    container.append(resBody.html);
    let lists = container.find('.geek_list');

    let geekPrevLists = lists.map((index, list) => {
        let titleObj = $(list).find('.tracking-ad .title');
        let title = titleObj.text();
        let originUrl = titleObj.attr('href');
        let meta = $(list).find('.list-inline a')[0].firstChild.nodeValue;
        let avatarUrl = $(list).find('img').attr('src');
        let subjectUrl = $(list).find('.list-inline a').length === 1 ? $(list).find('.list-inline a').attr('href') : $(list).find('.list-inline a').last().attr('href');
        let subjectText = $(list).find('.list-inline a').length === 1 ? $(list).find('.list-inline a').text() : $(list).find('.list-inline a').last().text();

        return {
            listTitle:title,
            listOriginUrl: originUrl,
            listMeta: meta,
            listAvatarUrl: avatarUrl,
            listSubjectUrl: subjectUrl,
            listSubjectText: subjectText
        };
    });

    let arr = lib.listToArr(geekPrevLists);
    container = null;

    this.response.body = {
        postLists:arr,
        hasNext: resBody.has_more,
        from: resBody.from
    };
}

module.exports.register = (router) => {
    router.get('/geek', geek);
    router.get('/geek/prev', geekPrev);
};