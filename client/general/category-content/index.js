/**
 * Created by pomy on 16/4/9.
 */

'use strict';

import './index.less';

import React, {Component} from 'react';

import TouTiaoContent from '../../contents/toutiao/index';
import GeekContent from '../../contents/geek/index';
import BoleContent from '../../contents/bole/index';
import SegmentFault from '../../contents/sg/index';

import {TechReadStore} from '../../stores/tech-read-store';

let techReadStore = new TechReadStore();

export default class CategoryContent extends Component {

    constructor (){
        super ();
        this.state = {
            articleUrl: '',
            iframeIsShow: false
        };
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
        let url = this.state.articleUrl.indexOf('//') !== -1 ? this.state.articleUrl : '//' + this.state.articleUrl;

        let renderContents = '';

        switch (~~categotyId) {
        case 0:
            renderContents = <TouTiaoContent open={this.openIframe.bind(this)}/>;
            break;
        case 1:
            renderContents = <GeekContent open={this.openIframe.bind(this)}/>;
            break;
        case 2:
            renderContents = <BoleContent open={this.openIframe.bind(this)}/>;
            break;
        case 3:
            renderContents = <SegmentFault open={this.openIframe.bind(this)}/>;
            break;
        }

        return (
            <div className="category-content">
                <div className="contents">
                    {renderContents}
                </div>
                <div className="article-content" style={{display:this.state.iframeIsShow ? 'block':'none'}}>
                    <iframe sandbox="allow-same-origin allow-top-navigation allow-scripts allow-forms" className="article-content-iframe"  src={url} frameBorder="0"></iframe>
                    <div className="close-iframe" onClick={this.closeIframe.bind(this)}>关闭</div>
                </div>
            </div>
        );
    }
}