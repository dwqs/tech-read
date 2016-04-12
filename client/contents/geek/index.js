/**
 * Created by pomy on 16/4/10.
 */

'use strict';

import './index.less';

import React, {Component} from 'react';

import {$,_} from '../../lib/base';

import Loading from '../../general/loading/index';

export default class GeekContent extends Component {

    constructor (){
        super ();
        this.state = {
            id: 1,
            origin: 'http://geek.csdn.net/',
            fetching: true,
            postLists: []
        };
    }

    componentWillMount (){
        fetch('/geek').then((response) => {
            return response.text();
        },(err)=>{
            console.log('error',err);
        }).then((text) => {
            this.setState({
                fetching: false,
                postLists: $(text).find('#geek_list').children('.geek_list')
            });
        });
    }

    listener (originUrl){
        return (e) => {
            e.stopPropagation();
            this.props.open(originUrl);
        };
    }

    renderPostList () {
        let posts = [];
        let postId = -1;

        _.forEach(this.state.postLists, (post) => {
            let div = $(post);
            let titleObj = div.find('.tracking-ad .title');
            let title = titleObj.text();
            let originUrl = titleObj.attr('href');
            let meta = div.find('.list-inline a')[0].firstChild.nodeValue;
            let avatarUrl = div.find('img').attr('src');
            let subjectUrl = div.find('.list-inline a').length === 1 ? div.find('.list-inline a').attr('href') : div.find('.list-inline a:last-child').attr('href');
            let subjectText = div.find('.list-inline a').length === 1 ? div.find('.list-inline a').text() : div.find('.list-inline a:last-child').text();

            posts.push(
                <div className="post" key={++postId} onClick={this.listener(originUrl)}>
                    <div className="content">
                        <h3 className="title">
                            <a target="_blank" href={originUrl}>{title}</a>
                        </h3>
                        <div className="meta">{meta}</div>
                    </div>
                    <div className="user-info">
                        <div className="user-avatar">
                            <img width="32" className="img-circle" src={avatarUrl} />
                        </div>
                    </div>
                    <div className="subject-name">来自 <a target="_blank" href={subjectUrl}>{subjectText}</a></div>
                </div>
            );
        });

        return posts;
    }

    render (){
        let isDisplay = Number(this.props.id) === this.state.id ? true : false;
        let geekPosts = this.renderPostList();

        if(this.state.fetching) {
            return (
                <div className="geek-contents" style={{display: isDisplay?'block':'none'}}>
                    <Loading/>
                </div>
            );
        }

        return (
            <div className="geek-contents" style={{display: isDisplay?'block':'none'}}>
                {geekPosts}
            </div>
        );
    }
}