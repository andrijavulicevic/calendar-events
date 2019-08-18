import {
  LOAD_EVENTS,
  CREATE_EVENT,
  DELETE_EVENT,
  RESET_EVENTS,
  LOAD_ALL_PARTICIPANTS
} from "./actions.type";
import {
  SET_EVENTS,
  REMOVE_EVENTS,
  START_EVENTS_LOADING,
  STOP_EVENTS_LOADING,
  SET_ALL_PARTICIPANTS,
  SET_EVENTS_ERROR
} from "./mutations.type";
import {
  loadEventsForUser,
  createEventForUser,
  loadParticipants,
  deleteEvent
} from "../api";

const state = {
  events: [],
  error: null,
  allParticipants: [],
  loading: false
};

const getters = {
  getEvents: state => state.events,
  getEventsError: state => state.error,
  getAllParticipants: state => state.allParticipants,
  getEventsLoading: state => state.loading
};

const mutations = {
  [SET_EVENTS]: (state, events) => (state.events = events),
  [REMOVE_EVENTS]: state => {
    state.events = [];
    state.loading = false;
  },
  [START_EVENTS_LOADING]: state => (state.loading = true),
  [STOP_EVENTS_LOADING]: state => (state.loading = false),
  [SET_ALL_PARTICIPANTS]: (state, allParticipants) => {
    state.allParticipants = allParticipants;
  },
  [SET_EVENTS_ERROR]: (state, error) => (state.error = error)
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
  [CREATE_EVENT]: async ({ commit, dispatch, rootState }, newEvent) => {
    commit(START_EVENTS_LOADING);
    try {
      newEvent.participants = newEvent.participants.map(participant => ({
        email: participant,
        accepted: false
      }));
      await createEventForUser(newEvent, rootState.auth.currentUser.email);
      commit(STOP_EVENTS_LOADING);
      dispatch(LOAD_EVENTS);
    } catch (error) {
      console.log(error);
      commit(STOP_EVENTS_LOADING);
    }
  },
  [RESET_EVENTS]: ({ commit }) => {
    commit(REMOVE_EVENTS);
  },
  [LOAD_ALL_PARTICIPANTS]: async ({ commit, rootState }) => {
    try {
      const allParticipants = await loadParticipants();
      const currentUserEmail = rootState.auth.currentUser.email;
      commit(
        SET_ALL_PARTICIPANTS,
        allParticipants.filter(email => email !== currentUserEmail)
      );
    } catch (error) {
      console.log(error);
    }
  },
  [DELETE_EVENT]: async ({ commit, dispatch, rootState }, event) => {
    commit(START_EVENTS_LOADING);
    try {
      await deleteEvent(event, rootState.auth.currentUser);
      commit(STOP_EVENTS_LOADING);
      dispatch(LOAD_EVENTS);
    } catch (error) {
      console.log(error);
      commit(STOP_EVENTS_LOADING);
      commit(SET_EVENTS_ERROR, error.message);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
