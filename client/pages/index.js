/**
 * Created by pomy on 16/4/7.
 */

'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {$} from '../lib/base';

import TechDailyRead from '../container/tech-daily-read';

$(() => {
    ReactDOM.render(
        <TechDailyRead/>,
        document.getElementById('tech-daily-read-container')
    );
});
