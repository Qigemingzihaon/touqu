import Vue from 'vue'
import Vuex from 'vuex'
import { setLSession, getLSession } from '@/utils/session'
import { EDEADLK } from 'constants'
Vue.use(Vuex)
let store = new Vuex.Store({
  state: {
    isFooter: true,
  },
  getters: {
    getSet(state) {
      return state.isFooter
    },
  },
  actions: {
    setF({ commit, state }, name) {
      commit('setFooter', name)
    },
  },
  mutations: {
    setFooter(state, name) {
      state.isFooter = name
    },
  },
})
export default store
