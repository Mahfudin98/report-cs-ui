/* eslint-disable prettier/prettier */
import axios from "axios";
import store from "../store";

const $axios = axios.create({
  baseURL: "https://api-report.lsskincare.id/api/",
  headers: {
    // Authorization: localStorage.getItem('token') != 'null' ? 'Bearer ' + localStorage.getItem('token'):'',
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
$axios.interceptors.request.use(
  function (config) {
    const token = store.state.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default $axios;
