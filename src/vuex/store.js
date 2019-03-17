import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import user from './modules/user'
import menu from './modules/menu'
import run from './modules/run'
Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10,
    loading: false
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    modules:{
        user,
        menu,
        run,
    }
})