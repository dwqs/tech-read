/**
 * Created by pomy on 16/4/8.
 */

'use strict';

var render = require('./render');

function* index () {
    this.response.body = yield render('index');
}

exports.register = function (router) {
    router.get('/', index);
    router.get('/index', index);
};