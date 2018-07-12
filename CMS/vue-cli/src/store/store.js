import Vue from 'vue'
import Vuex from 'vuex'

//引入自定义模块
import news from './s_modules/s_comment/comment.js'
import comment from './s_modules/s_news/news.js'
import * as actions from './s_common/actions.js'
import * as getters from './s_common/getters.js'
import * as mutations from './s_common/mutations.js'
// 其他导入方法
// import {updateValue,xxx,xxx} from './mutations.js'

Vue.use(Vuex);

/*  
    1.定义 state
    2.获取 getters
    3.修改 mutations commit
    4.异步 actions  dispatch
*/

export const store = new Vuex.Store({

    //state 只定义不做任何操作
    state: {
        //通用变量
        value: 0
    },
    //通用模块
    getters,
    mutations,
    actions,
    modules: {
        news,
        comment
    }
})
