//对axios进行二次封装
import axios from "axios";
//引入进度条
import nProgress from "nprogress";
import 'nprogress/nprogress.css'
//引入vuex仓库,处理游客临时身份
import store from "@/store"

const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
})
//请求拦截器,发请求之前处理一些逻辑
requests.interceptors.request.use((config) => {
    //把游客临时身份uuid放入请求头
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //携带token给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    //进度条开始
    nProgress.start()
    //config:配置对象，包含headers请求头
    return config
})

//响应拦截器,服务器返回数据回来时检测到，处理一些逻辑
requests.interceptors.response.use((res) => {
    //进度条结束
    nProgress.done()
    return res.data
}, (err) => {
    // return Promise.reject(new Error('fail'))
    return console.log(err.message);
})

export default requests