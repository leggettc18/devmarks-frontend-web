import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from "../actions/user";
import api from "@/api/api";
import Vue from "vue";
import { AUTH_LOGOUT } from "../actions/auth";
import { GetterTree, MutationTree, ActionTree } from "vuex"

class State {
    status: string = "";
    profile: any = {}
};

const getters = <GetterTree<State, any>>{
    getProfile: state => state.profile,
    isProfileLoaded: state => !!state.profile.name
};

const actions = <ActionTree<State, any>>{
    [USER_REQUEST]: ({ commit, dispatch }) => {
        commit(USER_REQUEST);
        api({ url: "/api/user/me"})
            .then(resp => {
                commit(USER_SUCCESS, resp);
            })
            .catch(() => {
                commit(USER_ERROR);
                dispatch(AUTH_LOGOUT);
            });
    }
};

const mutations = <MutationTree<State>>{
    [USER_REQUEST]: state => {
        state.status = "loading"
    },
    [USER_SUCCESS]: (state, resp) => {
        state.status = "success";
        Vue.set(state, "profile", resp);
    },
    [USER_ERROR]: state => {
        state.status = "error";
    },
    [AUTH_LOGOUT]: state => {
        state.profile = {};
    }
};

const UserModule = {
    state: new State(),
    getters: getters,
    actions: actions,
    mutations: mutations
};

export default UserModule;