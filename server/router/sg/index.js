/**
 * Created by pomy on 4/25/16.
 */

'use strict';

let $ = require('cheerio');
//let coRequest = require('co-request');

let requestPromise = require('../../lib');

function* sg () {
    this.response.set("Content-Type", "application/json;charset=utf-8");

    let resBody = yield requestPromise.parseBody('https://segmentfault.com/blogs').then((body) => {
        return body;
    });

    let origin = 'https://segmentfault.com';
    let lists = $(resBody).find('.stream-list').children();

    let sgLists = lists.map((index, list) => {
        let titleObj = $(list).find('.title a');
        let title = titleObj.text();
        let originUrl = origin + titleObj.attr('href');
        let metaAuthor = $(list).find('.author a:first-child').text();
        let metaTime = $(list).find('.author .split')[0].nextSibling.nodeValue;
        let avatarUrl = $(list).find('.author img').attr('src');
        let a = $(list).find('.author a')[1];
        let subjectUrl = origin + a.attribs.href;
        let subjectText = a.children[0].data;

        return {
            listTitle:title,
            listOriginUrl: originUrl,
            listMetaAuthor: metaAuthor,
            listTime: metaTime,
            listAvatarUrl: avatarUrl,
            listSubjectUrl: subjectUrl,
            listSubjectText: subjectText
        };
    });

    let arr = [];

    for (let i = 0, len = sgLists.length; i < len; i++) {
        arr.push(sgLists[i]);
    }

    this.response.body = {
        postLists:arr
    };
}

module.exports.register = (router) => {
    router.get('/sg', sg)
};