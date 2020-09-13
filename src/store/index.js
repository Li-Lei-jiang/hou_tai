import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
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

    }
})