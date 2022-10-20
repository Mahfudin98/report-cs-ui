/* eslint-disable prettier/prettier */
import $axios from "../service/api";

const state = () => ({
  products: [],
  select_products: [],
  categoryProduct: [],
  page: 1,
});

const mutations = {
  ASSIGN_PRODUCTS_LIST(state, payload) {
    state.products = payload;
  },

  ASSIGN_PRODUCTS_SELECT(state, payload) {
    state.select_products = payload;
  },

  ASSIGN_CATEGORY_PRODUCT(state, payload) {
    state.categoryProduct = payload;
  },

  SET_PAGE(state, payload) {
    state.page = payload;
  },
};

const actions = {
  getProducts({ commit, state }, payload) {
    let search = typeof payload != "undefined" ? payload : "";
    return new Promise((resolve) => {
      $axios
        .get(`/product-index?page=${state.page}&q=${search}`)
        .then((response) => {
          commit("ASSIGN_PRODUCTS_LIST", response.data);
          resolve(response.data);
        });
    }).catch((error) => {
      if (error.response.status == 422) {
        commit("SET_ERRORS", error.response.data.errors, { root: true });
      }
    });
  },

  getProductSelect({ commit }) {
    return new Promise((resolve) => {
      $axios.get(`/product-select`).then((response) => {
        commit("ASSIGN_PRODUCTS_SELECT", response.data.data);
        resolve(response.data);
      });
    }).catch((error) => {
      if (error.response.status == 422) {
        commit("SET_ERRORS", error.response.data.errors, { root: true });
      }
    });
  },

  getCategoryProduct({ commit }) {
    return new Promise((resolve) => {
      $axios.get(`/product-category`).then((response) => {
        commit("ASSIGN_CATEGORY_PRODUCT", response.data.data);
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
