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
        this.state = {
            articleUrl: '',
            iframeIsShow: false
        }
    }

    openIframe (url=''){
        this.setState({
            articleUrl: url,
            iframeIsShow: true
        });
    }

    closeIframe (){
        this.setState({
            iframeIsShow: false,
            articleUrl: ''
        });
    }

    componentDidMount (){
        techReadStore.listenCategoryChange(this.closeIframe.bind(this));
    }

    componentWillUnmount (){
        techReadStore = null;
    }

    render (){
        let categotyId = this.props.id;
        let url = '//' + this.state.articleUrl;

        return (
            <div className="category-content">
                <div className="contents">
                    <TouTiaoContent open={this.openIframe.bind(this)} id={categotyId}/>
                    <GeekContent id={categotyId}/>
                    <BoleContent id={categotyId}/>
                    <XiTuContent id={categotyId}/>
                </div>
                <div className="article-content" style={{display:this.state.iframeIsShow ? 'block':'none'}}>
                    <iframe sandbox="allow-same-origin allow-top-navigation allow-scripts allow-forms" className="article-content-iframe"  src={url} frameBorder="0"></iframe>
                    <div className="close-iframe" onClick={this.closeIframe.bind(this)}>关闭</div>
                </div>
            </div>
        );
    }
}