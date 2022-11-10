import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'
export default {
    namespaced: true,
    state: {
        cartList: []
    },
    actions: {
        //获取购物车列表数据
        async getCartList(context) {
            let result = await reqCartList()
            if (result.code === 200) {
                context.commit('GETCARTLIST', result.data)
            }
        },
        //删除购物车产品
        async deleteCartById(context, skuid) {
            let result = await reqDeleteCartById(skuid)
            if (result.code === 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error(`${result.message}`))
            }
        },
        //修改购物车产品选中状态
        async updateCheckedById(context, { skuid, isChecked }) {
            let result = await reqUpdateCheckedById(skuid, isChecked)
            if (result.code === 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error(`${result.message}`))
            }
        },
        //删除选中的产品
        deleteAllChecked(context) {
            let PromiseAll = []
            context.getters.cartList.cartInfoList.forEach(item => {
                if (item.isChecked === 1) {
                    let promise = context.dispatch('deleteCartById', item.skuId)
                    PromiseAll.push(promise)
                }
                return Promise.all(PromiseAll)
            });
        },
        //全选购物车商品
        updateAllCartChecked(context, isChecked) {
            let promiseAll = []
            context.state.cartList[0].cartInfoList.forEach(item => {
                let promise = context.dispatch('updateCheckedById', { skuid: item.skuId, isChecked })
                promiseAll.push(promise)
            })
            return Promise.all(promiseAll)
        }
    },
    mutations: {
        //获取购物车列表数据
        GETCARTLIST(state, cartList) {
            state.cartList = cartList
        }
    },
    getters: {
        //计算购物车数据
        cartList(state) {
            return state.cartList[0] || {}
        }
    }
}
