//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//引入vuex仓库，便于判断路由放行
import store from '@/store'

//重写push方法，防止多次跳转报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'

let router = new VueRouter({
    routes: [
        {
            name: 'home',
            path: '/home',
            component: Home,
            meta: { show: true }
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: Search,
            meta: { show: true },
        },
        {
            name: 'register',
            path: '/register',
            component: Register,
            meta: { show: false }
        },
        {
            name: 'login',
            path: '/login',
            component: Login,
            meta: { show: false }
        },
        {
            name: 'detail',
            path: '/detail/:skuid?',
            component: Detail,
            meta: { show: true }
        },
        {
            name: 'addcartsuccess',
            path: '/addcartsuccess',
            component: AddCartSuccess,
            meta: { show: true }
        },
        {
            name: 'shopcart',
            path: '/shopcart',
            component: ShopCart,
            meta: { show: true }
        },
        {
            name: 'trade',
            path: '/trade',
            component: Trade,
            meta: { show: true }
        },
        {
            name: 'pay',
            path: '/pay',
            component: Pay,
            meta: { show: true }
        },
        {
            name: 'paysuccess',
            path: '/paysuccess',
            component: PaySuccess,
            meta: { show: true }
        },
        //重定向
        {
            path: '*',
            redirect: '/home'
        }
    ],
    //跳转路由后滚动条置顶
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})

//全局前置首位
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    let userName = store.state.user.userInfo.name
    if (token) {
        //用户已登录不能跳转去login组件
        if (to.path == '/login') {
            next('/home')
        } else {
            //已登录 跳转到其他组件
            if (userName) {
                //有用户信息 直接放行
                next()
            } else {
                //没有用户信息，派发action获取用户信息
                try {
                    //获取用户信息成功，放行
                    await store.dispatch('user/getUserInfo')
                    next()
                } catch (err) {
                    //token失效,先清除token(走退出登录逻辑)，再跳转到登录界面
                    await store.dispatch('user/userLogout')
                    next('/login')
                }
            }
        }
    } else {
        //未登录
        next()
    }
})
export default router