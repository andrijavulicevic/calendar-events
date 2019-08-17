import { LOAD_EVENTS, CREATE_EVENT, RESET_EVENTS } from "./actions.type";
import {
  SET_EVENTS,
  REMOVE_EVENTS,
  START_EVENTS_LOADING,
  STOP_EVENTS_LOADING
} from "./mutations.type";
import { loadEventsForUser } from "../api";

const state = {
  events: [],
  loading: false
};

const getters = {
  getEvents: state => state.events,
  getEventsLoading: state => state.loading
};

const mutations = {
  [SET_EVENTS]: (state, events) => (state.events = events),
  [REMOVE_EVENTS]: state => {
    state.events = [];
    state.loading = false;
  },
  [START_EVENTS_LOADING]: state => (state.loading = true),
  [STOP_EVENTS_LOADING]: state => (state.loading = false)
};

const actions = {
  [LOAD_EVENTS]: async ({ commit, rootState }) => {
    const userEmail = rootState.auth.currentUser.email;
    commit(START_EVENTS_LOADING);
    try {
      const events = await loadEventsForUser(userEmail);
      commit(SET_EVENTS, events);
      commit(STOP_EVENTS_LOADING);
    } catch (error) {
      commit(STOP_EVENTS_LOADING);
    }
  },
  [CREATE_EVENT]: async () => {
    // todo
  },
  [RESET_EVENTS]: ({ commit }) => {
    commit(REMOVE_EVENTS);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
