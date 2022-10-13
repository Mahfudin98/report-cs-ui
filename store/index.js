/* eslint-disable prettier/prettier */
import { createStore } from "vuex";
import auth from "./auth.model";
import user from "./user.model";
import product from "./product.model";
import member from "./member.model";
import ongkir from "./ongkir.model";
import transaction from "./transaction.model";
const store = createStore({
    modules: {
        auth,
        user,
        product,
        member,
        ongkir,
        transaction
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