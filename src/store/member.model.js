/* eslint-disable prettier/prettier */
import $axios from "../service/api";

const state = () => ({
  select_member: [],
  member_index: [],
  page: 1,
  id: "",
  member_edit: "",
  member_detail: "",
  point: "",
  lineChart: [],
  barChart: [],
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
  SET_ID_UPDATE(state, payload) {
    state.id = payload;
  },
  ASSIGN_MEMBER_EDIT_DATA(state, payload) {
    state.member_edit = payload;
  },
  ASSIGN_MEMBER_DETAIL(state, payload) {
    state.member_detail = payload;
  },
  ASSIGN_POINT(state, payload) {
    state.point = payload;
  },
  ASSIGN_LINE_CHART(state, payload) {
    state.lineChart = payload;
  },
  ASSIGN_BAR_CHART(state, payload) {
    state.barChart = payload;
  },
};

const actions = {
  getIndexMember({ commit }, payload) {
    let search = typeof payload != "undefined" ? payload : "";
    return new Promise((resolve) => {
      $axios.get(`/member-index-cs?q=${search}`).then((response) => {
        commit("ASSIGN_DATA", response.data);
        resolve(response.data);
      });
    });
  },
  getSelectMember({ commit }, payload) {
    return new Promise((resolve) => {
      $axios.get(`/member-select/${payload}`).then((response) => {
        commit("ASSIGN_MEMBER_SELECT", response.data.data);
        resolve(response.data);
      });
    }).catch((error) => {
      if (error.response.status == 422) {
        commit("SET_ERRORS", error.response.data.errors, { root: true });
      }
    });
  },
  submitMember({ commit, dispatch }, payload) {
    return new Promise((resolve) => {
      $axios
        .post(`/member-store`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          resolve(response.data);
          dispatch("getIndexMember").then(() => resolve());
        })
        .catch((error) => {
          if (error.response.status == 422) {
            commit("SET_ERRORS", error.response.data.errors, { root: true });
          }
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  getMemberEdit({ commit }, payload) {
    return new Promise((resolve) => {
      $axios.get(`/member-edit/${payload}`).then((response) => {
        resolve(response.data);
      });
    });
  },
  updateMember({ state }, payload) {
    return new Promise((resolve) => {
      $axios
        .post(`/member-update/${state.id}`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          resolve(response.data);
        });
    });
  },
  updateMemberDetail({ state, dispatch }, payload) {
    return new Promise((resolve) => {
      $axios
        .post(`/member-update-detail/${state.id}`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          resolve(response.data);
          dispatch("getIndexMember").then(() => resolve());
        });
    });
  },
  getMemberDetail({ commit }, payload) {
    return new Promise((resolve) => {
      $axios.get(`/owner-member-detail-qr/${payload}`).then((response) => {
        commit("ASSIGN_MEMBER_DETAIL", response.data.data);
        resolve(response.data);
      });
    });
  },
  getPoint({ commit }, payload) {
    return new Promise((resolve) => {
      $axios
        .get(
          `/owner-point-data-member/${payload.idMember}?from=${payload.from}&to=${payload.to}`
        )
        .then((response) => {
          commit("ASSIGN_POINT", response.data.data);
          resolve(response.data);
        });
    });
  },
  getLineChart({ commit }, payload) {
    return new Promise((resolve) => {
      $axios
        .get(
          `/owner-line-data-member-qr/${payload.idMember}?year=${payload.year}&month=${payload.month}`
        )
        .then((response) => {
          commit("ASSIGN_LINE_CHART", response.data.data);
          resolve(response.data);
        });
    });
  },
  getBarChart({ commit }, payload) {
    return new Promise((resolve) => {
      $axios
        .get(
          `/owner-bar-data-member-qr/${payload.idMember}?year=${payload.year}`
        )
        .then((response) => {
          commit("ASSIGN_BAR_CHART", response.data.data);
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
