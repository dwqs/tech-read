/**
 * Created by pomy on 16/4/9.
 */

'use strict';

import './index.less';

import React, {Component} from 'react';

export default class Header extends Component {
    constructor (){
        super ();
    }

    render (){
        return (
            <header>
                <div className="tech-daily-read-header">
                    <span className="logo-text">Tech Daily Read</span>
                    <span className="logo-text-desc">Grab tech articles daily from UGC communities for reading</span>
                </div>
            </header>
        );
    }
}