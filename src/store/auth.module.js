import { LOGIN, LOGOUT, REGISTER } from "./actions.type";
import { SET_ERROR, SET_USER } from "./mutations.type";

const state = {
  isLoggedIn: false,
  user: null,
  error: null
};

const getters = {
  currentUser: state => state.user,
  error: state => state.error
};

const mutations = {
  [SET_ERROR]: (state, error) => (state.error = error),
  [SET_USER]: (state, user) => {
    state.isLoggedIn = true;
    state.user = user;
  }
};

const actions = {
  [LOGIN]: () => {
    // todo
  },
  [LOGOUT]: () => {
    // todo
  },
  [REGISTER]: () => {
    // todo
  }
};

export default { state, getters, mutations, actions };
