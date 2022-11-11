import Vue from 'vue'
import App from './App.vue'


//注册全局组件
//三级菜单
import TypeNave from '@/components/TypeNav'
Vue.component(TypeNave.name, TypeNave)
//分页器
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)


//引入路由
import router from '@/router'

//引入Vuex仓库
import store from '@/store'

//引入mock数据
import '@/mock/mockServe'

//引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//引入懒加载插件
import VueLazyload from 'vue-lazyload'
//引入加载图片
import loading from '@/assets/images/loading.png'
Vue.use(VueLazyload, {
  //懒加载默认图片
  loading
})


//测试axios
// import {reqCategoryList} from '@/api'
// reqCategoryList()

//关闭生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store
}).$mount('#app')
