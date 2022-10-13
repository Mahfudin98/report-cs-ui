import $axios from '../service/api'

const state = () => ({
  select_member: [],
})

const mutations = {
  ASSIGN_MEMBER_SELECT(state, payload) {
    state.select_member = payload
  },
}

const actions = {
  getSelectMember({ commit }) {
    return new Promise((resolve) => {
      $axios.get(`/member-select`).then((response) => {
        commit('ASSIGN_MEMBER_SELECT', response.data.data)
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
