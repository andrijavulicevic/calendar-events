import {
  LOGIN,
  LOGOUT,
  REGISTER,
  RESET_ERROR,
  RESET_EVENTS,
  LOAD_EVENTS,
  LOAD_PENDING_EVENTS
} from "./actions.type";
import {
  SET_AUTH_ERROR,
  SET_USER,
  REMOVE_USER,
  START_AUTH_LOADING,
  STOP_AUTH_LOADING
} from "./mutations.type";
import {
  GET_CURRENT_USER,
  GET_IS_LOGGED_IN,
  GET_IS_ORGANIZER,
  GET_AUTH_ERROR,
  GET_AUTH_LOADING
} from "./getters.type";
import { login, register } from "../api/index";
import router from "../router/";

const state = {
  isLoggedIn: false,
  isOrganizer: false,
  currentUser: null,
  error: null,
  loading: false
};

const getters = {
  [GET_CURRENT_USER]: state => state.currentUser,
  [GET_IS_LOGGED_IN]: state => state.isLoggedIn,
  [GET_IS_ORGANIZER]: state => state.isOrganizer,
  [GET_AUTH_ERROR]: state => state.error,
  [GET_AUTH_LOADING]: state => state.loading
};

const mutations = {
  [SET_AUTH_ERROR]: (state, error) => (state.error = error),
  [SET_USER]: (state, user) => {
    state.isLoggedIn = true;
    state.currentUser = user;
    if (user.role === "organizer") {
      state.isOrganizer = true;
    }
  },
  [REMOVE_USER]: state => {
    state.isLoggedIn = false;
    state.currentUser = null;
    state.isOrganizer = false;
  },
  [START_AUTH_LOADING]: state => (state.loading = true),
  [STOP_AUTH_LOADING]: state => (state.loading = false)
};

const actions = {
  [LOGIN]: async ({ commit, dispatch }, { email, password }) => {
    commit(START_AUTH_LOADING);
    try {
      await login(email, password);
      commit(SET_USER, { email, password });
      commit(SET_AUTH_ERROR, null);
      commit(STOP_AUTH_LOADING);
      dispatch(LOAD_EVENTS);
      dispatch(LOAD_PENDING_EVENTS);
      router.push({ name: "home" });
    } catch (error) {
      commit(SET_AUTH_ERROR, error.message);
      commit(STOP_AUTH_LOADING);
    }
  },
  [LOGOUT]: ({ commit, dispatch }) => {
    commit(REMOVE_USER);
    dispatch(RESET_EVENTS);
    router.push({ name: "login" });
  },
  [REGISTER]: async ({ commit }, { email, password, confirmPassword }) => {
    commit(START_AUTH_LOADING);
    try {
      await register(email, password, confirmPassword);
      commit(SET_AUTH_ERROR, null);
      commit(STOP_AUTH_LOADING);
      router.push({ name: "login" });
    } catch (error) {
      commit(SET_AUTH_ERROR, error.message);
      commit(STOP_AUTH_LOADING);
    }
  },
  [RESET_ERROR]: ({ commit }) => {
    commit(SET_AUTH_ERROR, null);
  }
};

export default { state, getters, mutations, actions };
