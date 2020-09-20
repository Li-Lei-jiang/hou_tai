import service from './index'

export default {
    //获取验证码
    getCode() {
        return service.req(`/captcha`)
    },
    //登陆
    login({ username, password, code }) {
        return service.req(`/user/login`, {
            username,
            password,
            code
        })
    },
    //注册
    Register({ username, password, }) {
        return service.req(`/user/register`, {
            username,
            password,
        })
    },
    // 获取折线图
    gethomeChat() {
        return service.req(`/homeChat`)
    },
    //获取雷达图
    getRadarChat() {
        return service.req(`/radarChat`)
    },
    //获取饼图
    getRingChat() {
        return service.req(`/ringChat`)
    },
    //获取柱状图
    getHomeData() {
        return service.req(`/homeData`)
    },
    //订单
    getOrderData() {
        return service.req(`/orderData`)
    },
    //进度条
    getProgress() {
        return service.req(`/progress`)
    },
    //获取所有文章
    getallArticle() {
        return service.req(`/article/allArticle`)
    },
}