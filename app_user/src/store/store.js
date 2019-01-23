import Vue from 'vue'
import Vuex from 'vuex'
import { setLSession, getLSession } from '@/utils/session'
import { EDEADLK } from 'constants'
Vue.use(Vuex)
let store = new Vuex.Store({
  state: {
    isFooter: true,
    loding: true,
    width: '0%',
    ISget: false,
    cartoon: false,
  },
  getters: {
    getloding(state) {
      return state.loding
    },
    getwidth(state) {
      return state.width
    },
    getSet(state) {
      return state.isFooter
    },
    getISget(state) {
      return state.ISget
    },
    getcartoon(state) {
      return state.cartoon
    },
  },
  actions: {
    setF({ commit, state }, name) {
      commit('setFooter', name)
    },
    setloding({ commit, state }, name) {
      commit('setloding', name)
    },
    setwidth({ commit, state }, name) {
      commit('setwidth', name)
    },
    setISget({ commit, state }, name) {
      commit('setISget', name)
    },
    setcartoon({ commit, state }, name) {
      commit('setcartoon', name)
    },
  },
  mutations: {
    setFooter(state, name) {
      state.isFooter = name
    },
    setloding(state, name) {
      state.width = name.W
      state.loding = name.B
    },
    setwidth(state, name) {
      state.width = name
    },
    setISget(state, name) {
      state.ISget = name
    },
    setcartoon(state, name) {
      state.cartoon = name
    },
  },
})
export default store
