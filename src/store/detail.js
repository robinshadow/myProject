import { reqGoodsInfo, reqUpdateShopCart } from '@/api'
//封装游客临时身份uuid
import { getUUID } from '@/utils/uuid_token'
export default {
    namespaced: true,
    state: {
        goodsInfo: {},
        //游客临时身份
        uuid_token: getUUID()
    },
    actions: {
        //获取商品详情信息
        async getGoodsInfo(context, skuid) {
            let result = await reqGoodsInfo(skuid)
            context.commit('GETGOODSINFO', result.data)
        },
        //加入购物车(前台把参数带给服务器，服务器写入数据，但没有给前台返回数据，所以不用储存数据)
        async updateShopCart(context, { skuid, skuNum }) {
            let result = await reqUpdateShopCart(skuid, skuNum)
            //判断加入购物车是否失败，返回结果(async函数返回结果是一个promise)
            if (result.code === 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('fail'))
            }
        }
    },
    mutations: {
        GETGOODSINFO(state, info) {
            state.goodsInfo = info
        }
    },
    getters: {
        //简化商品详情页分类数据；||{}防止返回undefined 读取undefined身上的属性报错
        categoryView(state) {
            return state.goodsInfo.categoryView || {}
        },
        skuInfo(state) {
            return state.goodsInfo.skuInfo || {}
        },
        //简化详情页售卖属性
        spuSaleAttrList(state) {
            return state.goodsInfo.spuSaleAttrList || []
        }
    }
}
