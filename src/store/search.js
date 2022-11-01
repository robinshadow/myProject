import { reqSearchList } from '@/api'
export default {
    namespaced: true,
    state: {
        searchList: {}
    },
    actions: {
        async getSearchList(context, val = {}) {
            let result = await reqSearchList(val)
            if (result.code === 200) {
                context.commit('GETSEARCHLIST', result.data)
            }
        }
    },
    mutations: {
        GETSEARCHLIST(state, searchList) {
            state.searchList = searchList
        }
    },
    getters: {}
}
