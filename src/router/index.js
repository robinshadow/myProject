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
//采用懒加载
/* import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由(我的订单)
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder' */

let router = new VueRouter({
    routes: [
        {
            name: 'home',
            path: '/home',
            component: () => import('@/pages/Home'),
            meta: { show: true }
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: () => import('@/pages/Search'),
            meta: { show: true },
        },
        {
            name: 'register',
            path: '/register',
            component: () => import('@/pages/Register'),
            meta: { show: false }
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('@/pages/Login'),
            meta: { show: false }
        },
        {
            name: 'detail',
            path: '/detail/:skuid?',
            component: () => import('@/pages/Detail'),
            meta: { show: true }
        },
        {
            name: 'addcartsuccess',
            path: '/addcartsuccess',
            component: () => import('@/pages/AddCartSuccess'),
            meta: { show: true }
        },
        {
            name: 'shopcart',
            path: '/shopcart',
            component: () => import('@/pages/ShopCart'),
            meta: { show: true }
        },
        {
            name: 'trade',
            path: '/trade',
            component: () => import('@/pages/Trade'),
            meta: { show: true },
            //路由独享守卫，只有通过购物车才能来到交易页面
            beforeEnter: (to, from, next) => {
                if (from.path == '/shopcart') {
                    next()
                } else {
                    next(false)
                }
            },
        },
        {
            name: 'pay',
            path: '/pay',
            component: () => import('@/pages/Pay'),
            meta: { show: true },
            //只有提交订单才能来到支付页
            beforeEnter: (to, from, next) => {
                if (from.path == '/trade') {
                    next()
                } else {
                    next(false)
                }
            },
        },
        {
            name: 'paysuccess',
            path: '/paysuccess',
            component: () => import('@/pages/PaySuccess'),
            meta: { show: true }
        },
        {
            name: 'center',
            path: '/center',
            component: () => import('@/pages/Center'),
            meta: { show: true },
            //重定向
            redirect: '/center/myorder',
            children: [
                {
                    name: 'myorder',
                    path: 'myorder',
                    component: () => import('@/pages/Center/MyOrder')
                },
                {
                    name: 'grouporder',
                    path: 'grouporder',
                    component: () => import('@/pages/Center/GroupOrder')
                }
            ]
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
        //未登录,不能跳转交易、支付、个人中心
        if (to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/center') != -1) {
            //用query参数储存 未登录前想跳转的路由 登陆后跳转到该路由
            next('/login?redirect=' + to.path)
        } else {
            next()
        }
    }
})
export default router