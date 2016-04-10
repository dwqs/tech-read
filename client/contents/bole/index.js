/**
 * Created by pomy on 16/4/10.
 */

'use strict';

import './index.less';

import React, {Component} from 'react';

export default class BoleContent extends Component {

    constructor (){
        super ();
        this.state = {
            id: 2,
            url: 'http://top.jobbole.com/',
            fetching: true
        };
    }

    render (){
        let isDisplay = Number(this.props.id) === this.state.id ? true : false;

        return (
            <div className="bole-contents" style={{display: isDisplay?'block':'none'}}>
                伯乐头条
            </div>
        );
    }
}