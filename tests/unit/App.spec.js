import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import App from "@/App";

const localVue = createLocalVue();
localVue.use(Vuetify);
const stubs = ["router-view"];
let vuetify;
const $route = { path: "http://localhost:3000/login", name: "login" };

const createComponent = () =>
  shallowMount(App, { localVue, vuetify, mocks: { $route }, stubs });

describe("App.vue", () => {
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("is a Vue instance", () => {
    const wrapper = createComponent();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("is an App component", () => {
    const wrapper = createComponent();
    expect(wrapper.is(App)).toBeTruthy();
  });
});
