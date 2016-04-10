/**
 * Created by pomy on 16/4/10.
 */

'use strict';

import './index.less';

import React, {Component} from 'react';

import {$,_} from '../../lib/base';

import Loading from '../../general/loading/index';

export default class TouTiaoContent extends Component {

    constructor (){
        super ();
        this.state = {
            id: 0,
            fetching: true,
            origin: 'http://toutiao.io',
            postLists: []
        };
    }

    componentWillMount (){
        fetch('/toutiao').then((response) => {
            return response.text();
        },(err)=>{
            console.log('error',err);
        }).then((text) => {
            this.setState({
                fetching: false,
                postLists: $(text).find('.posts:first').children('.post')
            });
        });
    }

    listener (originUrl){
        return (e) => {
            e.stopPropagation();

            let initHeaders = new Headers({
                'X-Custom-Header': originUrl
            });

            //mode:'no-cors'  不跨域
            fetch('/toutiao/article',{
                headers:initHeaders
            }).then((response) => {
                return response.json();
            },(err)=>{
                console.log('error',err);
            }).then((json) => {
                console.log('ssssss1111',json);
            });
        };
    }

    renderPostList () {
        let posts = [];
        let postId = -1;

        _.forEach(this.state.postLists, (post) => {
            let div = $(post);
            let titleObj = div.find('.title');
            let title = titleObj.text();
            let originUrl = titleObj.children('a').attr('href');
            let meta = div.find('.meta')[0].firstChild.nodeValue;
            let avatarUrl = div.find('img').attr('src');
            let subjectUrl = div.find('.subject-name a').attr('href');
            let subjectOriginUrl = `${this.state.origin}${subjectUrl}`;
            let subjectText = div.find('.subject-name a').text();

            posts.push(
                <div className="post" key={++postId} onClick={this.listener(originUrl)}>
                    <div className="content">
                        <h3 className="title">
                            <a href={originUrl}>{title}</a>
                        </h3>
                        <div className="meta">{meta}</div>
                    </div>
                    <div className="user-info">
                        <div className="user-avatar">
                            <img width="32" className="img-circle" src={avatarUrl} />
                        </div>
                    </div>
                    <div className="subject-name">来自 <a target="_blank" href={subjectOriginUrl}>{subjectText}</a></div>
                </div>
            );
        });

        return posts;
    }

    render (){
        let isDisplay = Number(this.props.id) === this.state.id ? true : false;
        let toutiaoPosts = this.renderPostList();

        if(this.state.fetching) {
            return (
                <div className="toutiao-contents" style={{display: isDisplay?'block':'none'}}>
                    <Loading/>
                </div>
            );
        }

        return (
            <div className="toutiao-contents" style={{display: isDisplay?'block':'none'}}>
                {toutiaoPosts}
            </div>
        );
    }
}
