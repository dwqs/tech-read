/**
 * Created by pomy on 4/25/16.
 */

'use strict';

let $ = require('cheerio');
//let coRequest = require('co-request');

let lib = require('../../lib');

function* bole () {
    this.response.set("Content-Type", "application/json;charset=utf-8");

    let resBody = yield lib.parseBody('http://top.jobbole.com/').then((body) => {
        return body;
    });

    let lists = $(resBody).find('.list-posts').children().not('.sponsored');

    let boleLists = lists.map((index, list) => {
        let titleObj = $(list).find('.p-tit a');
        let title = titleObj.text();
        let originUrl = titleObj.attr('href');
        let meta = $(list).find('.p-meta span:first-child').text();
        let avatarUrl = '/pomy.jpg';
        let subjectUrl = $(list).find('.p-tags a').length === 1 ? $(list).find('.p-tags a').attr('href') : '#';
        let subjectText = $(list).find('.p-tags a').length === 1 ? $(list).find('.p-tags a').text() : '无';

        return {
            listTitle:title,
            listOriginUrl: originUrl,
            listMeta: meta,
            listAvatarUrl: avatarUrl,
            listSubjectUrl: subjectUrl,
            listSubjectText: subjectText
        };
    });
    //avoid typeError: Converting circular structure to JSON
    //boleLists的输出如下,转化json时报上述的TypeError错误 因为形成了圈,无法解析,应该转化成数组
    // '0':
    //     { listTitle: 'Adobe 将升级视频剪辑软件Premiere，增加对VR的支持',
    //         listriginUrl: 'http://top.jobbole.com/34418/',
    //         listMeta: '11 小时前',
    //         listAvatarUrl: '/pomy.jpg',
    //         listSubjectUrl: '#',
    //         listSubjectText: '无' },
    //     '1':
    //     { listTitle: '万维网联盟正在Github上开发HTML5.1',
    //         listriginUrl: 'http://top.jobbole.com/34407/',
    //         listMeta: '16 小时前',
    //         listAvatarUrl: '/pomy.jpg',
    //         listSubjectUrl: '#',
    //         listSubjectText: '无' }

    let arr = lib.listToArr(boleLists);

    this.response.body = {
        postLists:arr
    };
}

module.exports.register = (router) => {
    router.get('/bole', bole);
};