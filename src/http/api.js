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
    }
}