import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import VeeValidate from "vee-validate";
import Login from "../../src/views/Login.vue";

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Vuex);
localVue.use(VeeValidate);

describe.skip("Login.vue", () => {
  let store, vuetify, getters, actions;
  const stubs = ["router-link"];

  beforeEach(() => {
    getters = {
      getError: () => "",
      getLoading: () => false
    };
    actions = {
      login: jest.fn()
    };
    store = new Vuex.Store({
      getters,
      actions
    });
    vuetify = new Vuetify();
  });

  it("is a Vue instance", () => {
    const wrapper = shallowMount(Login, { store, localVue, vuetify, stubs });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("is an Login component", () => {
    const wrapper = shallowMount(Login, { store, localVue, vuetify, stubs });
    expect(wrapper.is(Login)).toBeTruthy();
  });

  describe.skip("Login data", () => {
    const wrapper = shallowMount(Login, { store, localVue, vuetify, stubs });
    it("has data", () => {
      expect(Login.data).toBeTruthy();
    });

    it("data is of type function", () => {
      expect(typeof Login.data).toBe("function");
    });

    it("'email' is defined and of type string", () => {
      expect(wrapper.vm.email).toBeDefined();
      expect(typeof wrapper.vm.email).toBe("string");
    });

    it("'password' is defined and of type string", () => {
      expect(wrapper.vm.password).toBeDefined();
      expect(typeof wrapper.vm.password).toBe("string");
    });

    it("default data are set correctly", () => {
      expect(wrapper.vm.email).toBe("");
      expect(wrapper.vm.password).toBe("");
    });
  });
});
