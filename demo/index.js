/**
 * Created by pomy on 16/4/7.
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Hello from './hello';

require('./index.less');

window.onload = function() {
    ReactDOM.render(
        <Hello />,
        document.getElementById('demo')
    );
};

