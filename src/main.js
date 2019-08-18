import Vue from "vue";
import VeeValidate from "vee-validate";
import App from "./App.vue";
import router from "./router/";
import store from "./store/";
import vuetify from "./plugins/vuetify";
import { formatForDisplaying } from "./utils/date-utils";

Vue.config.productionTip = false;
Vue.use(VeeValidate, {
  events: "change|blur"
});
Vue.filter("date", formatForDisplaying);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
