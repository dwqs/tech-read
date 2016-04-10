/**
 * Created by pomy on 16/4/10.
 */
import './index.less';

import React ,{Component} from 'react';

export default class Loading extends Component{
    render (){
        return(
           <div className="loading">
               <div>
                   <img src="./loading.gif" alt="loading"/>
                   <p>正在努力加载中......</p>
               </div>
           </div>
        );
    }
}
