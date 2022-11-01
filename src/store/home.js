import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api'
// import axios from 'axios'

const home = {
    namespaced: true,
    state: {
        categoryList: [],
        bannerList: [],
        floorList: []
    },
    actions: {
        //获取分类列表商品数据
        async categoryList(context) {
            let result = await reqCategoryList()
            if (result.code === 200) {
                context.commit('CATEGORYLIST', result.data)
            }
        },
        /*  categoryList(context){
             axios.get('http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList').then(
                 res=>{
                     context.commit('CATEGORYLIST',res.data)
                 },err=>{
                     console.log(err.message);
                 }
             )
         } */
        //获取主轮播图图片数据
        async getBannerList(context) {
            let result = await reqGetBannerList()
            if (result.code === 200) {
                context.commit('GETBANNERLIST', result.data)
            }
        },
        //获取floor模块轮播图图片数据
        async getFloorList(context) {
            let result = await reqGetFloorList()
            if (result.code === 200) {
                context.commit('GETFLOORLIST', result.data)
            }
        }
    },
    mutations: {
        //分类列表商品数据
        CATEGORYLIST(state, categoryList) {
            state.categoryList = categoryList
        },
        //主轮播图图片数据
        GETBANNERLIST(state, bannerList) {
            state.bannerList = bannerList
        },
        //floor模块轮播图图片数据
        GETFLOORLIST(state, floorList) {
            state.floorList = floorList
        }
    },
    getters: {}
}

export default home