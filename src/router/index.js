//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

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

export default new VueRouter({
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