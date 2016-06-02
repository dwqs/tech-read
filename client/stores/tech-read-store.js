/**
 * Created by pomy on 16/4/9.
 */

'use strict';

let EventEmitter = require('events').EventEmitter;
let emitter = new EventEmitter();

let _data = {
    category: {
        id: 0,
        url: 'http://toutiao.io/'
    },
    lists: [{
        id: 0,
        url: 'http://toutiao.io/',
        title: '开发者头条'
    }, {
        id: 1,
        url: 'http://geek.csdn.net/',
        title: '极客头条'
    }, {
        id: 2,
        url: 'http://top.jobbole.com/',
        title: '伯乐头条'
    }, {
        id: 3,
        url: 'https://segmentfault.com/blogs',
        title: 'SegmentFault'
    },{
        id: 4,
        url: 'http://www.tuicool.com/ah/',
        title: '推酷'
    }]
};


let _store = {};

export class TechReadStore {

    init (data){
        _store = Object.assign(_data, data);
    }

    getTectReadStore (){
        return _store;
    }

    setTectReadStore (data){
        _store = Object.assign(_store, data);
    }

    listenCategoryChange (callback){
        emitter.on('CATEGORY_CHANGE', callback);
    }

    changeCategory (category) {
        _store = Object.assign(_store, category);
        emitter.emit('CATEGORY_CHANGE');
    }
}