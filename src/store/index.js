import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import auth from "./auth.module";
import events from "./events.module";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: "calendar-events",
  storage: window.localStorage,
  modules: ["auth", "events"]
});

export default new Vuex.Store({
  modules: {
    auth,
    events
  },
  plugins: [vuexLocal.plugin]
});
