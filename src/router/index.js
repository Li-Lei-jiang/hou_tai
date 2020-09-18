import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import common from '../components/common/common.vue'
Vue.use(VueRouter)

const routes = [
    //c重定向
    {
        path: '/',
        redirect: "/Home"
    },
    //登录
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/login/login')
    },
    //注册
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ('../views/register/register')
    },
    //首页
    {
        path: '/Home',
        component: common,
        children: [{
            path: '',
            name: 'home',
            component: Home
        }, ]

    },
    {
        path: '/updet',
        component: common,
        children: [{
            path: '',
            name: 'updet',
            component: () =>
                import ('../views/Home/updet/updet.vue')
        }]
    },
    //统计
    {
        path: '/statistics',
        component: common,
        children: [{
            path: '',
            name: 'statistics',
            component: () =>
                import ('../views/Home/statistics/statistics.vue')
        }]
    },
    //发表文章
    {
        path: '/publish',
        component: common,
        children: [{
            path: '',
            name: 'publish',
            component: () =>
                import ('../views/Home/publish/publish.vue')
        }]
    },
    //标签页
    {
        path: '/tabpage',
        component: common,
        children: [{
            path: '',
            name: 'tabpage',
            component: () =>
                import ('../views/Home/tabpage/tabpage.vue')
        }]
    },
    //导出
    {
        path: '/export',
        component: common,
        children: [{
            path: '',
            name: 'export',
            component: () =>
                import ('../views/Home/export/export.vue')
        }]
    },
    //图片上传
    {
        path: '/upload',
        component: common,
        children: [{
            path: '',
            name: 'upload',
            component: () =>
                import ('../views/Home/upload/upload.vue')
        }]
    },
    //退出系统
    {
        path: '/signOut',
        component: common,
        children: [{
            path: '',
            name: 'signOut',
            component: () =>
                import ('../views/Home/signOut/signOut.vue')
        }]
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router