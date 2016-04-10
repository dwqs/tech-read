/**
 * Created by pomy on 16/4/10.
 */

'use strict';

import './index.less';

import React, {Component} from 'react';

export default class XiTuContent extends Component {

    constructor (){
        super ();
        this.state = {
            id: 3,
            url: 'http://gold.xitu.io/',
            fetching: true
        };
    }

    render (){
        let isDisplay = Number(this.props.id) === this.state.id ? true : false;
        return (
            <div className="xitu-contents" style={{display: isDisplay?'block':'none'}}>
                稀土掘金
            </div>
        );
    }
}