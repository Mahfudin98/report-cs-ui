/* eslint-disable prettier/prettier */
import $axios from "../../service/api";

const state = () => ({
  barProfile: [],
});

const mutations = {
  ASSIGN_BAR_PROFILE(state, payload) {
    state.barProfile = payload;
  },
};

const actions = {
  getBarProfile({ commit }, payload) {
    return new Promise((resolve) => {
      $axios
        .get(
          `profile-bar/${payload.username}?month=${payload.month}&year=${payload.year}`
        )
        .then((response) => {
          commit("ASSIGN_BAR_PROFILE", response.data.data);
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
