/* eslint-disable prettier/prettier */
import $axios from "../service/api";

const state = () => ({
  listMP: [],
  listOrderMP: [],
  lineChart: [],
});

const mutations = {
  ASSIGN_LIST_MP(state, payload) {
    state.listMP = payload;
  },
  ASSIGN_LIST_ORDER_MP(state, payload) {
    state.listOrderMP = payload;
  },
  ASSIGN_LINE_CHART(state, payload) {
    state.lineChart = payload;
  },
};

const actions = {
  getListMP({ commit }) {
    return new Promise((resolve) => {
      $axios
        .get(`/marketplace-list`)
        .then((response) => {
          commit("ASSIGN_LIST_MP", response.data.data);
          resolve(response.data.data);
        })
        .catch((error) => {
          if (error.response.status == 422) {
            commit("SET_ERRORS", error.response.data.errors, { root: true });
          }
        });
    });
  },
  getListOrderMP({ commit }, payload) {
    return new Promise((resolve) => {
      let dateRange =
        typeof payload.dateRange != "undefined" &&
        payload.dateRange != "NaN-aN-aN+-+NaN-aN-aN"
          ? payload.dateRange
          : "";
      $axios
        .get(
          `/marketplace-order-index?order_by=${payload.orderBy}&date=${dateRange}`
        )
        .then((response) => {
          commit("ASSIGN_LIST_ORDER_MP", response.data.data);
          resolve(response.data.data);
        })
        .catch((error) => {
          if (error.response.status == 422) {
            commit("SET_ERRORS", error.response.data.errors, { root: true });
          }
        });
    });
  },
  storeOrderMP({ commit }, payload) {
    return new Promise((resolve) => {
      $axios
        .post(`/marketplace-store-order`, payload, {
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
  removeOrderMP({ dispatch }, payload) {
    return new Promise((resolve) => {
      $axios.delete(`/marketplace-destroy-order/${payload}`).then(() => {
        dispatch("getListOrderMP").then(() => resolve());
      });
    });
  },
  getLineChart({ commit }, payload) {
    return new Promise((resolve) => {
      $axios
        .get(
          `/marketplace-order-line?year=${payload.year}&month=${payload.month}`
        )
        .then((response) => {
          commit("ASSIGN_LINE_CHART", response.data.data);
          resolve(response.data);
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
