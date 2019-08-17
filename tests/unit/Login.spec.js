import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import Login from "../../src/views/Login";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe.skip("Login.vue", () => {
  let store, vuetify;
  const stubs = ["router-link"];

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        error: "",
        loading: false
      },
      getters: {
        getError: jest.fn(),
        getLoading: jest.fn()
      },
      actions: {
        login: jest.fn()
      }
    });
    vuetify = new Vuetify();
  });

  it("is a Vue instance", () => {
    const wrapper = shallowMount(Login, { localVue, store, vuetify });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("is an Login component", () => {
    const wrapper = shallowMount(Login, { localVue, store, vuetify });
    expect(wrapper.is(Login)).toBeTruthy();
  });

  describe("Login data", () => {
    const wrapper = shallowMount(Login, { localVue, store, vuetify, stubs });
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
