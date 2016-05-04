/**
 * Created by pomy on 4/25/16.
 */

'use strict';

let $ = require('cheerio');
//let coRequest = require('co-request');

let lib = require('../../lib');
let sgLib = require('./sgLib');

function* sg () {
    let resBody = yield lib.parseBody('https://segmentfault.com/blogs').then((body) => {
        return body;
    });

    let lists = $(resBody).find('.stream-list').children();
    let sgLists = sgLib.parseList(lists);
    let arr = lib.listToArr(sgLists);

    this.response.body = {
        postLists:arr
    };
}

module.exports.register = (router) => {
    router.get('/sg', sg)
};