/**
 * Created by pomy on 16/4/11.
 */

'use strict';

let request = require('request');

module.exports = function (url) {
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