/**
 * Created by pomy on 6/5/16.
 */

'use strict';

let $ = require('cheerio');

exports.parseList = function (lists) {
    let origin = 'http://www.tuicool.com';

    let tcLists = lists.map((index, list) => {
        let titleObj = $(list).find('.title a');
        let title = titleObj.attr('title');
        let originUrl = origin + titleObj.attr('href');
        let metaTime = $(list).find('.tip>span').last().text();
        let avatarUrl = '/pomy.jpg';
        let subjectText = $(list).find('.tip>span').first().text();

        return {
            listTitle:title,
            listOriginUrl: originUrl,
            listTime: metaTime,
            listAvatarUrl: avatarUrl,
            listSubjectText: subjectText
        };
    });

    return tcLists;  
};