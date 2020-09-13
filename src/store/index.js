import Vue from 'vue'
import Vuex from 'vuex'
// vuex持久化插件
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()], //加上这个就可以了
    state: {
        userData: {},
    },
    mutations: {
        getUserData(state, all) {
            state.userData = all;
        }
    },
    actions: {

    },
    modules: {

    },
    getters: {

    },

})