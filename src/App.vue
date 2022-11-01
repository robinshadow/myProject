<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: { Header, Footer },
  mounted() {
    //让Vuex发送请求，获取数据存储在仓库中
    //放在根组件，让请求只发送一次，优化性能
    this.$store.dispatch('home/categoryList')
  }
}
</script>
