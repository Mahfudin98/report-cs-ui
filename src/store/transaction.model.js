import $axios from "../service/api";

const state = () => ({
  transactions: [],
});

const mutations = {
  ASSIGN_TRANSACTION_LIST(state, payload) {
    state.transactions = payload;
  },
};

const actions = {
  getTransaction({ commit }) {
    return new Promise((resolve) => {
      $axios.get(`/transaction-index`).then((response) => {
        commit("ASSIGN_TRANSACTION_LIST", response.data.data);
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
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
