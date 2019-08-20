import {
  LOAD_EVENTS,
  LOAD_PENDING_EVENTS,
  CREATE_EVENT,
  DELETE_EVENT,
  RESET_EVENTS,
  LOAD_ALL_PARTICIPANTS,
  UPDATE_EVENT,
  ACCEPT_EVENT_INVITE,
  DECLINE_EVENT_INVITE
} from "./actions.type";
import {
  SET_EVENTS,
  SET_PENDING_EVENTS,
  REMOVE_EVENTS,
  START_EVENTS_LOADING,
  STOP_EVENTS_LOADING,
  SET_ALL_PARTICIPANTS,
  SET_EVENTS_ERROR
} from "./mutations.type";
import {
  GET_EVENTS,
  GET_PENDING_EVENTS,
  GET_EVENTS_ERROR,
  GET_ALL_PARTICIPANTS,
  GET_EVENTS_LOADING
} from "./getters.type";
import {
  loadEventsForUser,
  loadPendingEvents,
  createEventForUser,
  loadParticipants,
  deleteEvent,
  updateEvent,
  acceptInvite,
  declineInvite
} from "../api";

const state = {
  events: [],
  pendingEvents: [],
  error: null,
  allParticipants: [],
  loading: false
};

const getters = {
  [GET_EVENTS]: state => state.events,
  [GET_PENDING_EVENTS]: state => state.pendingEvents,
  [GET_EVENTS_ERROR]: state => state.error,
  [GET_ALL_PARTICIPANTS]: state => state.allParticipants,
  [GET_EVENTS_LOADING]: state => state.loading
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
  [SET_EVENTS_ERROR]: (state, error) => (state.error = error),
  [SET_PENDING_EVENTS]: (state, events) => (state.pendingEvents = events)
};

const actions = {
  [LOAD_EVENTS]: async ({ commit, rootState }) => {
    commit(START_EVENTS_LOADING);
    try {
      const events = await loadEventsForUser(rootState.auth.currentUser);
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
      //
    }
  },
  [DELETE_EVENT]: async ({ commit, dispatch, rootState }, event) => {
    commit(START_EVENTS_LOADING);
    try {
      await deleteEvent(event, rootState.auth.currentUser);
      commit(STOP_EVENTS_LOADING);
      commit(SET_EVENTS_ERROR, null);
      dispatch(LOAD_EVENTS);
    } catch (error) {
      commit(STOP_EVENTS_LOADING);
      commit(SET_EVENTS_ERROR, error.message);
    }
  },
  [UPDATE_EVENT]: async ({ commit, dispatch, rootState }, event) => {
    commit(START_EVENTS_LOADING);
    try {
      await updateEvent(event, rootState.auth.currentUser);
      commit(STOP_EVENTS_LOADING);
      commit(SET_EVENTS_ERROR, null);
      dispatch(LOAD_EVENTS);
    } catch (error) {
      commit(STOP_EVENTS_LOADING);
      commit(SET_EVENTS_ERROR, error.message);
    }
  },
  [LOAD_PENDING_EVENTS]: async ({ commit, rootState }) => {
    commit(START_EVENTS_LOADING);
    try {
      const events = await loadPendingEvents(rootState.auth.currentUser);
      commit(STOP_EVENTS_LOADING);
      commit(SET_EVENTS_ERROR, null);
      commit(SET_PENDING_EVENTS, events);
    } catch (error) {
      commit(STOP_EVENTS_LOADING);
      commit(SET_EVENTS_ERROR, error.message);
    }
  },
  [ACCEPT_EVENT_INVITE]: ({ dispatch, rootState }, eventId) => {
    acceptInvite(eventId, rootState.auth.currentUser);
    dispatch(LOAD_PENDING_EVENTS);
    dispatch(LOAD_EVENTS);
  },
  [DECLINE_EVENT_INVITE]: ({ dispatch, rootState }, eventId) => {
    declineInvite(eventId, rootState.auth.currentUser);
    dispatch(LOAD_PENDING_EVENTS);
    dispatch(LOAD_EVENTS);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
