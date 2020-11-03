import Vue from 'vue'
import Vuex from 'vuex'
// vuex持久化插件
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()], //加上这个就可以了
    //状态对象
    state: {
        userData: {},
    },
    //直接更新state 的多个方法的对象
    mutations: {
        getUserData(state, all) {
            state.userData = all;
        }
    },
    //基于state 的计算属性
    getters: {

    },
    //通过mutations间接更新state 的多个方法的对象
    actions: {

    },
    //
    modules: {

    },


})