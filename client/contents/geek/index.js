/**
 * Created by pomy on 16/4/10.
 */

'use strict';

import './index.less';

import React, {Component} from 'react';

export default class GeekContent extends Component {

    constructor (){
        super ();
        this.state = {
            id: 1,
            url: 'http://geek.csdn.net/',
            fetching: true
        };
    }

    render (){
        let isDisplay = Number(this.props.id) === this.state.id ? true : false;

        return (
            <div className="geek-contents" style={{display: isDisplay?'block':'none'}}>
                极客头条
            </div>
        );
    }
}