import $axios from "../service/api";

const state = () => ({
  transactions: [],
  detailTR: "",
  page: 1,
});

const mutations = {
  ASSIGN_TRANSACTION_LIST(state, payload) {
    state.transactions = payload;
  },
  ASSIGN_DETAIL_TR(state, payload) {
    state.detailTR = payload;
  },
  SET_PAGE(state, payload) {
    state.page = payload;
  },
};

const actions = {
  getTransaction({ commit, state }, payload) {
    let dateRange = typeof payload != "undefined" ? payload : "";
    return new Promise((resolve) => {
      $axios
        .get(`/transaction-index?page=${state.page}&date=${dateRange}`)
        .then((response) => {
          commit("ASSIGN_TRANSACTION_LIST", response.data);
          resolve(response.data);
        });
    });
  },
  getDetailTR({ commit }, payload) {
    return new Promise((resolve) => {
      $axios.get(`/transaction-show/${payload}`).then((response) => {
        commit("ASSIGN_DETAIL_TR", response.data.data);
        resolve(response.data);
      });
    });
  },
  postTransaction({ commit }, payload) {
    return new Promise((resolve) => {
      $axios
        .post(`/transaction-store`, payload, {
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
  removeTransaction({ dispatch }, payload) {
    return new Promise((resolve) => {
      $axios.delete(`/transaction-delete/${payload}`).then(() => {
        dispatch("getTransaction").then(() => resolve());
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
