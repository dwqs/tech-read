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
            return response.json();
        },(err)=>{
            console.log('error',err);
        }).then((json) => {
            this.setState({
                fetching: false,
                postLists: json.postLists
            });
        });
    }

    listener (originUrl){
        return (e) => {
            e.stopPropagation();
            if (e.target.nodeName.toLowerCase() === 'a' || e.target.nodeName.toLowerCase() === 'h3'){
                return;
            }
            this.props.open(originUrl);
        };
    }

    renderPostList () {
        let posts = [];
        let postId = -1;

        _.forEach(this.state.postLists, (list) => {
            let title = list.listTitle;
            let originUrl = list.listOriginUrl;
            let meta = list.listMeta;
            let avatarUrl = list.listAvatarUrl;
            let subjectUrl = list.listSubjectUrl;
            let subjectText = list.listSubjectText;

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
        let geekPosts = this.renderPostList();

        if(this.state.fetching) {
            return (
                <div className="geek-contents">
                    <Loading/>
                </div>
            );
        }

        return (
            <div className="geek-contents">
                {geekPosts}
            </div>
        );
    }
}