/* eslint-disable prettier/prettier */
import $axios from "../service/api";
// import qs from 'qs'

const state = () => ({
  users: [],
  usersCS: [],
  page: 1,
  edit: [],
  profile: "",
  userLogin: {},
});

const mutations = {
  ASSIGN_USERS_LOGIN(state, payload) {
    state.userLogin = payload;
  },

  ASSIGN_USERS_LIST(state, payload) {
    state.users = payload;
  },

  ASSIGN_USERS_CS(state, payload) {
    state.usersCS = payload;
  },

  SET_PAGE(state, payload) {
    state.page = payload;
  },

  ASSIGN_EDIT_USER(state, payload) {
    state.edit = payload;
  },

  ASSIGN_PROFILE(state, payload) {
    state.profile = payload;
  },
};

const actions = {
  getUsersLogin({ commit }) {
    return new Promise((resolve) => {
      $axios.get(`/user-login`).then((response) => {
        commit("ASSIGN_USERS_LOGIN", response.data.data);
        resolve(response.data);
      });
    }).catch((error) => {
      if (error.response.status == 422) {
        commit("SET_ERRORS", error.response.data.errors, { root: true });
      }
    });
  },

  getUsers({ commit, state }, payload) {
    let search = typeof payload != "undefined" ? payload : "";
    return new Promise((resolve) => {
      $axios
        .get(`/user-list?page=${state.page}&search=${search}`)
        .then((response) => {
          commit("ASSIGN_USERS_LIST", response.data);
          resolve(response.data);
        });
    }).catch((error) => {
      if (error.response.status == 422) {
        commit("SET_ERRORS", error.response.data.errors, { root: true });
      }
    });
  },

  getUsersCS({ commit }) {
    return new Promise((resolve) => {
      $axios.get(`/user-cs`).then((response) => {
        commit("ASSIGN_USERS_CS", response.data.data);
        resolve(response.data);
      });
    }).catch((error) => {
      if (error.response.status == 422) {
        commit("SET_ERRORS", error.response.data.errors, { root: true });
      }
    });
  },

  getUserDetail({ commit }, payload) {
    return new Promise((resolve) => {
      $axios.get(`/user-show/${payload}`).then((response) => {
        commit("ASSIGN_PROFILE", response.data.data);
        resolve(response.data);
      });
    });
  },

  getUserEdit({ commit }) {
    return new Promise((resolve) => {
      $axios
        .get(`/user-edit`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response.status == 422) {
            commit("SET_ERRORS", error.response.data.errors, { root: true });
          }
        });
    });
  },

  profileUpdate({ commit }, payload) {
    return new Promise((resolve) => {
      $axios
        .post(`/profile-update`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          if (error.response.status == 422) {
            commit("SET_ERRORS", error.response.data.errors, { root: true });
          }
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
