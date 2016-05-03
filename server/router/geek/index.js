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
    let resBody = yield lib.parseBody('http://geek.csdn.net/service/news/get_news_list?size=2').then((body) => {
        return JSON.parse(body);
    });

    let lists = $(resBody.html)//.find('.geek_list');
    //匹配dl标签 进行替换
    console.log('ssssjjj',resBody.html);

    // for(let prop in $(resBody.html)){
    //     console.log('pppp',prop);
    // }


    // let geekPrevLists = lists.map((index, list) => {
    //     let titleObj = $(list).find('.tracking-ad .title');
    //     let title = titleObj.text();
    //     let originUrl = titleObj.attr('href');
    //     let meta = $(list).find('.list-inline a')[0].firstChild.nodeValue;
    //     let avatarUrl = $(list).find('img').attr('src');
    //     let subjectUrl = $(list).find('.list-inline a').length === 1 ? $(list).find('.list-inline a').attr('href') : $(list).find('.list-inline a').last().attr('href');
    //     let subjectText = $(list).find('.list-inline a').length === 1 ? $(list).find('.list-inline a').text() : $(list).find('.list-inline a').last().text();
    //
    //     return {
    //         listTitle:title,
    //         listOriginUrl: originUrl,
    //         listMeta: meta,
    //         listAvatarUrl: avatarUrl,
    //         listSubjectUrl: subjectUrl,
    //         listSubjectText: subjectText
    //     };
    // });

    let arr = lib.listToArr([]);

    this.response.body = {
        postLists:arr,
        hasNext: resBody.has_more
    };
}

module.exports.register = (router) => {
    router.get('/geek', geek);
    router.get('/geek/prev', geekPrev);
};