/* eslint-disable prettier/prettier */
import $axios from "../../service/api";

const state = () => ({
  activitys: [],
});

const mutations = {
  ASSIGN_ACTIVITY_USER(state, payload) {
    state.activitys = payload;
  },
};

const actions = {
  getActivity({ commit }, payload) {
    return new Promise((resolve) => {
      $axios
        .get(
          `user-activity/${payload.username}?date=${payload.date}`
        )
        .then((response) => {
          commit("ASSIGN_ACTIVITY_USER", response.data.data);
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
