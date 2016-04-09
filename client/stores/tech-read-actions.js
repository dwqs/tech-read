/**
 * Created by pomy on 16/4/9.
 */

'use strict';

import {techReadDispatcher} from './tech-read-dispatch';

export class TechReadActions {

    changeCategoryAction (category) {
        techReadDispatcher.dispatch({
            type : 'CATEGORY_CHANGE',
            payload: category
        });
    }
}