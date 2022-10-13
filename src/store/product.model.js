/* eslint-disable no-unused-vars */
import $axios from '../service/api'

const state = () => ({
  products: [],
  select_products: [],
})

const mutations = {
  ASSIGN_PRODUCTS_LIST(state, payload) {
    state.products = payload
  },

  ASSIGN_PRODUCTS_SELECT(state, payload) {
    state.select_products = payload
  },
}

const actions = {
  getProducts({ commit }) {
    return new Promise((resolve) => {
      $axios.get(`/product-index`).then((response) => {
        commit('ASSIGN_PRODUCTS_LIST', response.data.data)
        resolve(response.data)
      })
    }).catch((error) => {
      if (error.response.status == 422) {
        commit('SET_ERRORS', error.response.data.errors, { root: true })
      }
    })
  },

  getProductSelect({ commit }, payload) {
    return new Promise((resolve) => {
      $axios.get(`/product-select`).then((response) => {
        commit('ASSIGN_PRODUCTS_SELECT', response.data.data)
        resolve(response.data)
      })
    }).catch((error) => {
      if (error.response.status == 422) {
        commit('SET_ERRORS', error.response.data.errors, { root: true })
      }
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
