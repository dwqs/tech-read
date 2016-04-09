/**
 * Created by pomy on 16/4/9.
 */

'use strict';

import './../../public/reset.less';

import React, {Component} from 'react';

import ContentContainer from './content-container';

import Header from '../general/header/index';

import {TechReadStore} from '../stores/tech-read-store';

let techReadStore = new TechReadStore();

export default class TechDailyRead extends Component {

    constructor (){
        super ();
    }

    componentWillMount () {
        let initData = {
            category: {}
        };
        let defaultId = 0;
        let defaultUrl = 'http://toutiao.io/';

        initData.category['id'] = localStorage.getItem('category_id') ? Number(localStorage.getItem('category_id')) : defaultId;
        initData.category['url'] = localStorage.getItem('category_url') ? localStorage.getItem('category_url') : defaultUrl;

        techReadStore.init(initData);
    }

    componentWillUnmount () {
        techReadStore = null;
    }

    render (){
        return (
            <div className="tech-daily-read">
                <Header/>
                <ContentContainer/>
            </div>
        );
    }
}
