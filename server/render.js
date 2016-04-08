/**
 * Created by pomy on 16/4/8.
 */

'use strict';

var path = require('path');
var views = require('co-views');

module.exports = views(path.resolve(__dirname, '../public'),{
    map: {html: 'swig'}
});