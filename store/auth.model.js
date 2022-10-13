/* eslint-disable prettier/prettier */
import $axios from '../service/api'

const state = () => ({
  user: [],
  image: '',
})
const mutations = {
  ASSIGN_USER_AUTH(state, payload) {
    state.user = payload
  },
  ASSIGN_USER_IMAGE(state, payload) {
    state.image = payload
  },
}

const actions = {
  submit({ commit }, payload) {
    localStorage.setItem('token', null)
    commit('SET_TOKEN', null, { root: true })
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      $axios
        .post(`/login`, payload)
        .then((response) => {
          if (response.data.status == 'success') {
            localStorage.setItem('token', response.data.data)
            commit('SET_TOKEN', response.data.data, { root: true })
          } else {
            commit('SET_ERRORS', { invalid: 'Username/Password kamu salah' }, { root: true })
          }
        })
        .catch((error) => {
          if (error.response.status == 401) {
            commit('SET_ERRORS', error.response.data.errors, { root: true })
          }
        })
    })
  },

  getUser({ commit }) {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      $axios.get(`user-login`).then((response) => {
        commit('ASSIGN_USER_AUTH', response.data.data)
        resolve(response.data)
      })
    })
  },

  getImage({ commit }) {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      $axios.get(`user-image`).then((response) => {
        commit('ASSIGN_USER_IMAGE', response.data.data)
        resolve(response.data)
      })
    })
  },

  logout() {
    return new Promise((resolve) => {
      localStorage.removeItem('token')
      resolve()
      $axios.post('/logout').then((response) => {
        resolve(response.data)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
