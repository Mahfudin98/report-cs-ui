/* eslint-disable prettier/prettier */
import $axios from "../../service/api";

const state = () => ({
  lineChart: [],
  topCS: [],
  topProduct: [],
  cardStatus: [],
});

const mutations = {
  ASSIGN_LINE_CHART(state, payload) {
    state.lineChart = payload;
  },
  ASSIGN_DATA_TOP_CS(state, payload) {
    state.topCS = payload
  },
  ASSIGN_DATA_TOP_PRODUK(state, payload) {
    state.topProduct = payload
  },
  ASSIGN_DATA_CARD_STATUS(state, payload) {
    state.cardStatus = payload
  }
};

const actions = {
  getLineChart({ commit }, payload) {
    return new Promise((resolve) => {
      $axios
        .get(
          `line-chart-dashboard?month=${payload.month}&year=${payload.year}`
        )
        .then((response) => {
          commit("ASSIGN_LINE_CHART", response.data.data);
          resolve(response.data);
        });
    });
  },
  getTopCS({ commit }, payload) {
    let dateRange = typeof payload != "undefined" && payload != "NaN-aN-aN+-+NaN-aN-aN" ? payload : "";
    return new Promise((resolve) => {
      $axios
        .get(`/top-cs?date=${dateRange}`)
        .then((response) => {
          commit("ASSIGN_DATA_TOP_CS", response.data.data);
          resolve(response.data);
        });
    });
  },
  getTopProduct({ commit }) {
    return new Promise((resolve) => {
      $axios.get(`/top-product`).then((response) => {
        commit("ASSIGN_DATA_TOP_PRODUK", response.data.data)
        resolve(response.data)
      })
    })
  },
  getCardStatus({ commit }) {
    return new Promise((resolve) => {
      $axios.get(`/card-status`).then((response) => {
        commit("ASSIGN_DATA_CARD_STATUS", response.data)
        resolve(response.data)
      })
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
