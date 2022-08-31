import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/units/storage'

Vue.use(Vuex)

const toutiao = 'TOUTIAO_USER'
export default new Vuex.Store({
    state: {
        user: getItem(toutiao)
    },
    getters: {},
    mutations: {
        setUser(state, data) {
            state.user = data
            setItem(toutiao, state.user)
        }
    },
    actions: {},
    modules: {}
})