/**
 * Created by pomy on 16/4/10.
 */

'use strict';

import '../common/contents.less';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {_} from '../../lib/base';

import Loading from '../../general/loading/index';

export default class SegmentFault extends Component {

    constructor (){
        super ();
        this.state = {
            id: 3,
            url: 'https://segmentfault.com/blogs',
            fetching: true,
            postLists: [],
            loading: false,
            curPage: 1,
            hasNext: 1,   //1有0无
            moreFetchUrl: 'https://segmentfault.com/blogs?page='
        };
    }

    componentWillMount (){
        fetch('/sg').then((response) => {
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

    fetchPrev (){
        let preUrl = `${this.state.moreFetchUrl}${++this.state.curPage}`;
        let initHeaders = new Headers({
            'X-Custom-Header': preUrl
        });

        fetch('/sg/prev',{
            headers:initHeaders
        }).then((res) => {
            return res.json();
        },(err)=>{
            console.log('error',err);
        }).then((json) => {
            this.setState({
                loading: false,
                postLists: this.state.postLists.concat(json.postLists),
                hasNext: json.hasNext
            });
        });
    }

    scrollListener (contentsHeight,e){
        let _self = this;

        let triggerNextMinHeight = e.target.scrollHeight - e.target.scrollTop - contentsHeight;
        if(triggerNextMinHeight < 22) {
            //locked
            if(!!!_self.state.loading && this.state.hasNext){
                //grab prev day data
                _self.fetchPrev();
                _self.setState({
                    loading: true
                });
            }
        }
    }

    componentDidMount (){
        let _self = this;
        //let contents = document.getElementsByClassName('toutiao-contents')[0];
        let contents = ReactDOM.findDOMNode(this);
        let contentsHeight = contents.getBoundingClientRect().height;

        /**
         * e.target.scrollHeight 是元素的可见高度加不可见的高度
         * e.target.scrollTop 是滚动的高度 其最大值是e.target.scrollHeight-contentHeight(被隐藏的高度)
         * contentsHeight 元素本身的高度
         */
        contents.addEventListener('scroll',_self.scrollListener.bind(this,contentsHeight),false);
    }

    componentWillUnmount (){
        let _self = this;

        let contents = ReactDOM.findDOMNode(this);
        contents.removeEventListener('scroll',_self.scrollListener);
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
            let author = list.listMetaAuthor;
            let time = list.listTime;
            let avatarUrl = list.listAvatarUrl;
            let subjectUrl = list.listSubjectUrl;
            let subjectText = list.listSubjectText;

            posts.push(
                <div className="post" key={++postId} onClick={this.listener(originUrl)}>
                    <div className="content">
                        <h3 className="title">
                            <a target="_blank" href={originUrl}>{title}</a>
                        </h3>
                        <div className="meta">{author}&nbsp;{time}</div>
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
        let sgPosts = this.renderPostList();
        let loading = this.state.loading ?
            <div className="next-loading">正在加载....</div>
            : !this.state.hasNext ? <div className="next-loading">没有更多了</div>:'';

        if(this.state.fetching) {
            return (
                <div className="xitu-contents">
                    <Loading/>
                </div>
            );
        }
        return (
            <div className="sg-contents">
                {sgPosts}
                {loading}
            </div>
        );
    }
}