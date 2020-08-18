import {
    AUTH_REQUEST,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_LOGOUT
} from "../actions/auth";
import { GetterTree, MutationTree, ActionTree } from "vuex"
import { USER_REQUEST } from "../actions/user";
import api from "@/api/api";

class State {
    token: string = localStorage.getItem("user-token") || "";
    status: string = "";
    hasLoadedOnce: boolean = false;
}

const getters = <GetterTree<State, any>>{
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
};

const actions = <ActionTree<State, any>>{
    [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            api({url: "api/auth/token", data: user, method: "POST" })
                .then(resp => {
                    localStorage.setItem("user-token", resp.data.token);
                    api.defaults.headers.common['Authorization'] = resp.data.token
                    commit(AUTH_SUCCESS, resp);
                    dispatch(USER_REQUEST);
                    resolve(resp);
                })
                .catch(err => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem("user-token");
                    reject(err);
                });
        })
    },
    [AUTH_LOGOUT]: ({ commit }) => {
        return new Promise(resolve => {
            commit(AUTH_LOGOUT);
            resolve();
        });
    }
};

const mutations = <MutationTree<State>>{
    [AUTH_REQUEST]: state => {
        state.status = "loading";
    },
    [AUTH_SUCCESS]: (state, resp) => {
        state.status = "success";
        state.token = resp.token;
        state.hasLoadedOnce = true;
    },
    [AUTH_ERROR]: state => {
        state.status = "error";
        state.hasLoadedOnce = true;
    },
    [AUTH_LOGOUT]: state => {
        state.token = "";
    }
};

const AuthModule = {
    state: new State(),
    getters: getters,
    actions: actions,
    mutations: mutations
};

export default AuthModule;