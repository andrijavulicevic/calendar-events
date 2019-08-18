import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import CeTimePicker from "../../src/components/CeEvent/CeTimePicker";

const localVue = createLocalVue();
localVue.use(Vuetify);
let vuetify;
const propsData = {
  label: "Choose time",
  initialTime: "13:00"
};

const createComponent = () =>
  shallowMount(CeTimePicker, { localVue, vuetify, propsData });

describe("App.vue", () => {
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("is a Vue instance", () => {
    const wrapper = createComponent();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("is an CeTimePicker component", () => {
    const wrapper = createComponent();
    expect(wrapper.is(CeTimePicker)).toBeTruthy();
  });

  describe("CeTimePicker props", () => {
    it("has 'label' property", () => {
      const wrapper = createComponent();
      expect(wrapper.props("label")).toBeTruthy();
    });

    it("'label' is of type String", () => {
      const wrapper = createComponent();
      expect(typeof wrapper.props("label")).toBe("string");
    });

    it("value of 'label' is 'Choose time'", () => {
      const wrapper = createComponent();
      expect(wrapper.props("label")).toBe("Choose time");
    });

    it("has 'initialTime' property", () => {
      const wrapper = createComponent();
      expect(wrapper.props("initialTime")).toBeTruthy();
    });

    it("'initialTime' is of type String", () => {
      const wrapper = createComponent();
      expect(typeof wrapper.props("initialTime")).toBe("string");
    });

    it("vale of 'initialTime' is '13:00'", () => {
      const wrapper = createComponent();
      expect(wrapper.props("initialTime")).toBe("13:00");
    });
  });

  describe("CeTimePicker data", () => {
    it("has data", () => {
      expect(CeTimePicker.data).toBeTruthy();
    });

    it("data is of type function", () => {
      expect(typeof CeTimePicker.data).toBe("function");
    });

    it("'menu' is defined and of type Boolean", () => {
      const wrapper = createComponent();
      expect(wrapper.vm.menu).toBeDefined();
      expect(typeof wrapper.vm.menu).toBe("boolean");
    });

    it("'time' is defined and of type String", () => {
      const wrapper = createComponent();
      expect(wrapper.vm.time).toBeDefined();
      expect(typeof wrapper.vm.time).toBe("string");
    });

    it("'time' has initial value of prop 'initialTime'", () => {
      const wrapper = createComponent();
      expect(wrapper.vm.time).toBe(wrapper.props("initialTime"));
    });

    it("'time' changes when prop 'initialTime' is changed", () => {
      const wrapper = createComponent();
      wrapper.setProps({ initialTime: "16:00" });
      expect(wrapper.vm.time).toBe("16:00");
    });
  });

  it("event 'timeChanged' emitted", () => {
    const wrapper = createComponent();
    wrapper.vm.$emit("timeChanged", "12:00");
    expect(wrapper.emitted().timeChanged).toBeTruthy();
    expect(wrapper.emitted().timeChanged.length).toBe(1);
    expect(wrapper.emitted().timeChanged[0]).toEqual(["12:00"]);
  });
});
