/* eslint-disable prettier/prettier */
import $axios from "../service/api";

const state = () => ({
  select_member: [],
  member_index: [],
  page: 1,
});

const mutations = {
  ASSIGN_DATA(state, payload) {
    state.member_index = payload;
  },
  ASSIGN_MEMBER_SELECT(state, payload) {
    state.select_member = payload;
  },
  SET_PAGE(state, payload) {
    state.page = payload;
  },
};

const actions = {
  getIndexMember({ commit, state }, payload) {
    let search = typeof payload != "undefined" ? payload : "";
    return new Promise((resolve) => {
      $axios
        .get(`/member-index-cs?page=${state.page}&q=${search}`)
        .then((response) => {
          commit("ASSIGN_DATA", response.data);
          resolve(response.data);
        });
    });
  },
  getSelectMember({ commit }) {
    return new Promise((resolve) => {
      $axios.get(`/member-select`).then((response) => {
        commit("ASSIGN_MEMBER_SELECT", response.data.data);
        resolve(response.data);
      });
    }).catch((error) => {
      if (error.response.status == 422) {
        commit("SET_ERRORS", error.response.data.errors, { root: true });
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
