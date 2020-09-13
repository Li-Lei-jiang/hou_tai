module.exports = {
    devServer: {
        //配置端口号 port:8080 用以真机调试
        host: '0.0.0.0', //代理跨域
        proxy: {
            '/api': {
                ws: false,
                //target 请求接根路径
                target: "http://localhost:3000",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
};