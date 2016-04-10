/**
 * Created by pomy on 16/4/9.
 */

'use strict';

import './index.less';

import React, {Component} from 'react';

import CategoryList from '../category-list/index';
import CategoryContent from '../category-content/index';

export default class ContentView extends Component {
    constructor (){
        super ();
        this.state={
            id: 0,
            url: 'http://toutiao.io/'
        };
    }

    updateView (){
        this.setState({
            id: arguments[0].id,
            url: arguments[0].url
        });
    }

    componentWillMount (){
        let categoryId = localStorage.getItem('category_id');
        let categoryUrl = localStorage.getItem('category_url');

        this.setState({
            id: categoryId ? categoryId : this.state.id,
            url: categoryUrl ? categoryUrl : this.state.url
        });
    }

    render (){
        return (
            <div className="tech-daily-read-content">
                <CategoryList update={this.updateView.bind(this)}/>
                <CategoryContent id={this.state.id} url={this.state.url}/>
            </div>
        );
    }
}
