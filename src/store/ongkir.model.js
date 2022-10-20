/* eslint-disable prettier/prettier */
import $axios from "../service/api";

const state = () => ({
  provinsi: [],
  kota: [],
  kecamatan: [],
  ongkir: "",
});

const mutations = {
  ASSIGN_PROVINSI_DATA(state, payload) {
    state.provinsi = payload;
  },

  ASSIGN_KOTA_DATA(state, payload) {
    state.kota = payload;
  },

  ASSIGN_KECAMATAN_DATA(state, payload) {
    state.kecamatan = payload;
  },

  ASSIGN_ONGKIR_DATA(state, payload) {
    state.ongkir = payload;
  },
};

const actions = {
  getProvinsi({ commit }) {
    return new Promise((resolve) => {
      $axios.get(`/provinsi`).then((response) => {
        commit("ASSIGN_PROVINSI_DATA", response.data.data);
        resolve(response.data);
      });
    }).catch((error) => {
      if (error.response.status == 422) {
        commit("SET_ERRORS", error.response.data.errors, { root: true });
      }
    });
  },

  getKota({ commit }, payload) {
    return new Promise((resolve) => {
      $axios.get(`/kota/${payload}`).then((response) => {
        commit("ASSIGN_KOTA_DATA", response.data.data);
        resolve(response.data);
      });
    }).catch((error) => {
      if (error.response.status == 422) {
        commit("SET_ERRORS", error.response.data.errors, { root: true });
      }
    });
  },

  getKecamatan({ commit }, payload) {
    return new Promise((resolve) => {
      $axios.get(`/kecamatan/${payload}`).then((response) => {
        commit("ASSIGN_KECAMATAN_DATA", response.data.data);
        resolve(response.data);
      });
    }).catch((error) => {
      if (error.response.status == 422) {
        commit("SET_ERRORS", error.response.data.errors, { root: true });
      }
    });
  },

  getOngkir({ commit }, payload) {
    return new Promise((resolve) => {
      $axios
        .post(`/cek-ongkir`, payload)
        .then((response) => {
          commit("ASSIGN_ONGKIR_DATA", response.data);
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
