/**
 * Created by pomy on 16/4/9.
 */

'use strict';

import './index.less';

import React, {Component} from 'react';

import TouTiaoContent from '../../contents/toutiao/index';
import GeekContent from '../../contents/geek/index';
import BoleContent from '../../contents/bole/index';
import XiTuContent from '../../contents/xitu/index';

import {TechReadStore} from '../../stores/tech-read-store';

let techReadStore = new TechReadStore();

export default class CategoryContent extends Component {

    constructor (){
        super ();
    }

    componentWillUnmount (){
        techReadStore = null;
    }

    render (){
        let categotyId = this.props.id;

        return (
            <div className="category-content">
                <div className="contents">
                    <TouTiaoContent id={categotyId}/>
                    <GeekContent id={categotyId}/>
                    <BoleContent id={categotyId}/>
                    <XiTuContent id={categotyId}/>
                </div>
            </div>
        );
    }
}