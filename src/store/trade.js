import { reqAddressInfo, reqOrderInfo, reqSubmitOrder, reqPayInfo } from "@/api"

export default {
    namespaced: true,
    state: {
        addressInfo: [],
        orderInfo: {},
        orderId: '',
        payInfo: {}
    },
    actions: {
        //获取用户地址信息
        async getAddressInfo(context) {
            let result = await reqAddressInfo()
            if (result.code === 200) {
                context.commit('GETADDRESSINFO', result.data)
            }
        },
        //获取商品清单数据
        async getOrderInfo(context) {
            let result = await reqOrderInfo()
            if (result.code === 200) {
                context.commit('GETORDERINFO', result.data)
            }
        },
        //提交订单
        async submitOrder(context, { tradeNo, data }) {
            let result = await reqSubmitOrder(tradeNo, data)
            if (result.code === 200) {
                //拿到订单号
                context.commit('GETORDERID', result.data)
            } else {
                return Promise.reject(new Error(`${result.message}`))
            }
        },
        //获取订单支付信息
        async getPayInfo(context, orderId) {
            let result = await reqPayInfo(orderId)
            if (result.code === 200) {
                context.commit('GETPAYINFO', result.data)
            }
        }
    },
    mutations: {
        GETADDRESSINFO(state, address) {
            state.addressInfo = address
        },
        GETORDERINFO(state, orderInfo) {
            state.orderInfo = orderInfo
        },
        GETORDERID(state, orderId) {
            state.orderId = orderId
        },
        GETPAYINFO(state, payInfo) {
            state.payInfo = payInfo
        }
    },
    getters: {}
}