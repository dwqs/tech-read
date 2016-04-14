/**
 * Created by pomy on 16/4/8.
 */

'use strict';

var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var koa = require('koa');
var koaJson = require('koa-json');
var bodyParser = require('koa-bodyparser');
var router = require('koa-router')();

var path = require('path');

var routerRegister = require('./router');

var app = koa();

app.use(bodyParser());
app.use(koaJson());
// Serve static files
app.use(serve(path.resolve(__dirname, '../public')));
// Compress
app.use(compress());
// Logger
app.use(logger());
//router
routerRegister.register(router);
app.use(router.middleware());

app.listen('9000','127.0.0.1',  () => {
    console.log('listening on port 9000...');
});