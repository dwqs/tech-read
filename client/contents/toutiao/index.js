/**
 * Created by pomy on 16/4/10.
 */

'use strict';

import './index.less';

import React, {Component} from 'react';

import {$,_} from '../../lib/base';
import {timeConvert} from '../../lib/time-convert';

import Loading from '../../general/loading/index';

export default class TouTiaoContent extends Component {

    constructor (){
        super ();
        //一天的毫秒数
        this.oneDayMill = +24*60*60*1000;
        this.currentDayMill = +new Date();

        this.state = {
            id: 0,
            fetching: true,
            origin: 'http://toutiao.io',
            postLists: [],
            loading: false,
            nextFetchUrl: 'http://toutiao.io/prev'
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

    fetchNext (utc){
        let day = timeConvert(utc);
        console.log('sssss111',this.currentDayMill);
        this.currentDayMill = new Date(day).getTime();
        console.log('sssss',day,this.currentDayMill);
    }

    componentDidMount (){
        let _self = this;
        let contents = document.getElementsByClassName('toutiao-contents')[0];
        let contentsHeight = contents.getBoundingClientRect().height;

        /**
         * e.target.scrollHeight 是元素的可见高度加不可见的高度
         * e.target.scrollTop 是滚动的高度 其最大值是e.target.scrollHeight-contentHeight(被隐藏的高度)
         * contentsHeight 元素本身的高度
         */
        contents.addEventListener('scroll', (e) => {
            let triggerNextMinHeight = e.target.scrollHeight - e.target.scrollTop - contentsHeight;
            if(triggerNextMinHeight < 22) {
                _self.fetchNext(_self.currentDayMill - _self.oneDayMill);
                _self.setState({
                    loading: true
                });
            }
        },false);
    }

    componentWillUnmount (){
        let contents = document.getElementsByClassName('toutiao-contents')[0];
        console.log('toutiao',contents);
    }

    listener (originUrl){
        return (e) => {
            e.stopPropagation();
            if (e.target.nodeName.toLowerCase() === 'a' || e.target.nodeName.toLowerCase() === 'h3'){
                return;
            }
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
                if(json.url){
                    this.props.open(json.url);
                }
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
                            <a target="_blank" href={originUrl}>{title}</a>
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
        let toutiaoPosts = this.renderPostList();
        let loading = this.state.loading ? <div className="next-loading">正在加载....</div>:'';


        if(this.state.fetching) {
            return (
                <div className="toutiao-contents">
                    <Loading/>
                </div>
            );
        }

        return (
            <div className="toutiao-contents">
                {toutiaoPosts}
                {loading}
            </div>
        );
    }
}
