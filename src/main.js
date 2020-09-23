import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import api from './http/api'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "nprogress/nprogress.css";
import dayjs from 'dayjs'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// 引入echarts
import echarts from 'echarts'





Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$dayjs = dayjs
Vue.prototype.$api = api
Vue.prototype.$echarts = echarts
Vue.use(mavonEditor)






new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')