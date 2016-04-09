/**
 * Created by pomy on 16/4/9.
 */

'use strict';

import './index.less';

import React, {Component} from 'react';

import CategoryList from '../category-list/index';
import CategoryContent from '../category-content/index';

export default class ContentView extends Component {
    constructor (){
        super ();
    }

    render (){
        return (
            <div className="tech-daily-read-content">
                <CategoryList/>
                <CategoryContent/>
            </div>
        );
    }
}