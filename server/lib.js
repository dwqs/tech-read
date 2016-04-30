/**
 * Created by pomy on 16/4/11.
 */

'use strict';

let request = require('request');

exports.parseUrl = function (url) {
    return new Promise(function (resolve, reject) {
        let req = request.get(url);
        let urlPath = '';

        req.on('error', (err) => {
           reject(err);
        });
        req.on('response', (res) => {
            if(res.statusCode === 200) {
                urlPath = res.client._httpMessage._headers.host + res.client._httpMessage.path;
                resolve(urlPath);
            }
        });
    });
};

exports.parseBody = function (url) {
    return new Promise(function (resolve, reject) {
        request(url, (error, res, body) => {
           if(!error && res.statusCode === 200) {
               resolve(body);
           } else {
               reject(error);
           }
        });
    });
};

exports.listToArr = function (lists) {
    let len = lists.length;
    let arr = [];

    for (let i = 0; i < len; i++) {
        arr.push(lists[i]);
    }
    
    return arr;
};

//all router handler
// exports.allRouter = function (router) {
//     return function* () {
//         router.get('*', function* () {
//             console.log('sssss', this.request.path);
//             this.response.set("Content-Type", "application/json;charset=utf-8");
//             //max-age:以秒为单位
//             this.respones.set("Cache-Conteol", "max-age=60*60");
//             yield next;
//         });
//     }
// };