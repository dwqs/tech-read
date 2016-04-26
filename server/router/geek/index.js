/**
 * Created by pomy on 4/25/16.
 */

'use strict';

let $ = require('cheerio');
//let coRequest = require('co-request');

let lib = require('../../lib');

function* geek () {
    this.response.set("Content-Type", "application/json;charset=utf-8");

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

module.exports.register = (router) => {
    router.get('/geek', geek);
};