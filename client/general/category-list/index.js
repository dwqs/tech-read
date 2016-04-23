/**
 * Created by pomy on 16/4/9.
 */

'use strict';

import './index.less';

import React, {Component} from 'react';

import {$,_} from '../../lib/base';

import {TechReadActions} from '../../stores/tech-read-actions';
import {TechReadStore} from '../../stores/tech-read-store';

let techReadActions = new TechReadActions();
let techReadStore = new TechReadStore();

export default class CategoryList extends Component {

    constructor (){
        super ();
    }

    selectCategory (e){
        e.stopPropagation();
        e.preventDefault();

        //本地化
        localStorage.setItem('category_id', Number($(e.target).data('id')));
        localStorage.setItem('category_url', $(e.target).data('url'));

        $(e.target).addClass('active').siblings().removeClass('active');

        let newCategory = {
            id: Number($(e.target).data('id')),
            url: $(e.target).data('url')
        };

        techReadActions.changeCategoryAction(newCategory);

        this.props.update(newCategory);
    }

    componentWillUnmount (){
        techReadActions = null;
        techReadStore = null;
        window.removeEventListener('scroll');
    }

    componentDidMount (){
        let lists = document.getElementsByClassName('lists')[0];
        window.addEventListener('scroll', (e) => {
            if (e.target.body.scrollTop >= 90){
                lists.classList.add('fixed-list');
            } else {
                lists.classList.remove('fixed-list');
            }
        }, false);
    }

    renderCategoryList (){
        let categoryList = [];
        let activeClass = '';
        let store = techReadStore.getTectReadStore();

        _.forEach(store.lists, (item) => {
            activeClass=store.category.id === item.id ? 'active' : '';
            categoryList.push(
                <li className={activeClass} key={item.id} data-id={item.id} data-url={item.url}>
                    {item.title}
                </li>
            );
        });

        return categoryList;
    }

    render (){
        let categoryList = this.renderCategoryList();

        return (
            <div className="category-list">
                <div className="lists">
                    <ul onClick={this.selectCategory.bind(this)}>
                        {categoryList}
                    </ul>
                </div>
            </div>
        );
    }
}