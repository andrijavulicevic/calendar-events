import { LOGIN, LOGOUT, REGISTER, RESET_ERROR } from "./actions.type";
import {
  SET_ERROR,
  SET_USER,
  START_LOADING,
  STOP_LOADING
} from "./mutations.type";
import { login, register } from "../api/index";
import router from "../router/";

const state = {
  isLoggedIn: false,
  user: null,
  error: null,
  loading: false
};

const getters = {
  getCurrentUser: state => state.user,
  getError: state => state.error,
  getLoading: state => state.loading
};

const mutations = {
  [SET_ERROR]: (state, error) => (state.error = error),
  [SET_USER]: (state, user) => {
    state.isLoggedIn = true;
    state.user = user;
  },
  [START_LOADING]: state => (state.loading = true),
  [STOP_LOADING]: state => (state.loading = false)
};

const actions = {
  [LOGIN]: async ({ commit }, { email, password }) => {
    commit(START_LOADING);
    try {
      await login(email, password);
      commit(SET_USER, { email, password });
      commit(SET_ERROR, null);
      commit(STOP_LOADING);
      router.push({ name: "home" });
    } catch (error) {
      commit(SET_ERROR, error.message);
      commit(STOP_LOADING);
    }
  },
  [LOGOUT]: () => {
    // todo
  },
  [REGISTER]: async ({ commit }, { email, password, confirmPassword }) => {
    commit(START_LOADING);
    try {
      await register({ email, password, confirmPassword });
      commit(SET_ERROR, null);
      commit(START_LOADING);
    } catch (error) {
      commit(SET_ERROR, error.message);
      commit(STOP_LOADING);
    }
  },
  [RESET_ERROR]: ({ commit }) => {
    commit(SET_ERROR, null);
  }
};

export default { state, getters, mutations, actions };
