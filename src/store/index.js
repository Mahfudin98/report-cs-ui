/* eslint-disable prettier/prettier */
import { createStore } from "vuex";
import auth from "./auth.model";
import user from "./user.model";
import product from "./product.model";
import member from "./member.model";
import ongkir from "./ongkir.model";
import transaction from "./transaction.model";
import dashboardPR from "./dashboard/profile.model";
import dashboard from "./dashboard/dashboard.model";
import activity from "./dashboard/activity.model";
const store = createStore({
    modules: {
        auth,
        user,
        product,
        member,
        ongkir,
        transaction,
        dashboardPR,
        dashboard,
        activity
    },
    state: {
        token: localStorage.getItem('token'),
        errors: []
    },
    getters: {
        isAuth: state => {
            return state.token != "null" && state.token != null
        }
    },
    mutations: {
        SET_TOKEN(state, payload){
            state.token = payload
        },
        SET_ERRORS(state, payload){
            state.errors = payload
        },
        CLEAR_ERRORS(state){
            state.errors = []
        }
    }
})

export default store;