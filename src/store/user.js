//登录与注册模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
//引入token处理函数
import { setToken, getToken, removeToken } from '@/utils/token'

export default {
    namespaced: true,
    state: {
        code: '',
        token: getToken(),
        userInfo: {}
    },
    actions: {
        //获取验证码
        async getCode(context, phone) {
            let result = await reqGetCode(phone)
            if (result.code === 200) {
                context.commit('GETCODE', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error(`${result.message}`))
            }
        },
        //用户注册
        async userRegister(context, userInfo) {
            let result = await reqUserRegister(userInfo)
            if (result.code === 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error(`${result.message}`))
            }
        },
        //用户登录
        async userLogin(context, loginData) {
            let result = await reqUserLogin(loginData)
            if (result.code === 200) {
                context.commit('USERLOGIN', result.data.token)
                //持久化储存token
                setToken(result.data.token)
                return 'ok'
            } else {
                return Promise.reject(new Error(`${result.message}`))
            }
        },
        //获取用户信息
        async getUserInfo(context) {
            let result = await reqUserInfo()
            if (result.code === 200) {
                context.commit('GETUSERINFO', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error(`${result.message}`))
            }
        },
        //退出登录
        async userLogout(context) {
            let result = await reqLogout()
            if (result.code === 200) {
                context.commit('clearUserInfo')
                return 'ok'
            } else {
                return Promise.reject(new Error(`${result.message}`))
            }
        }
    },
    mutations: {
        GETCODE(state, code) {
            state.code = code
        },
        USERLOGIN(state, token) {
            state.token = token
        },
        GETUSERINFO(state, userInfo) {
            state.userInfo = userInfo
        },
        //清除用户数据
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
            state.userInfo = getToken()
            removeToken()
        }
    },
    getters: {}
}

