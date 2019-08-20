import { createLocalVue, mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import CeTimePicker from "../../src/components/CeEvent/CeTimePicker";

const localVue = createLocalVue();
localVue.use(Vuetify);
let vuetify;
let wrapper;
const propsData = {
  label: "Choose time",
  initialTime: "13:00"
};

const createComponent = () =>
  mount(CeTimePicker, { localVue, vuetify, propsData });

describe("CeTimePicker.vue", () => {
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = createComponent();
  });

  it("is a Vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("is an CeTimePicker component", () => {
    expect(wrapper.is(CeTimePicker)).toBeTruthy();
  });

  it("should match snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("CeTimePicker props", () => {
    it("has 'label' property", () => {
      expect(wrapper.props("label")).toBeTruthy();
    });

    it("'label' is of type String", () => {
      expect(typeof wrapper.props("label")).toBe("string");
    });

    it("value of 'label' is 'Choose time'", () => {
      expect(wrapper.props("label")).toBe("Choose time");
    });

    it("has 'initialTime' property", () => {
      expect(wrapper.props("initialTime")).toBeTruthy();
    });

    it("'initialTime' is of type String", () => {
      expect(typeof wrapper.props("initialTime")).toBe("string");
    });

    it("vale of 'initialTime' is '13:00'", () => {
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
      expect(wrapper.vm.menu).toBeDefined();
      expect(typeof wrapper.vm.menu).toBe("boolean");
    });

    it("'menu' has initial value false", () => {
      expect(wrapper.vm.menu).toBe(false);
    });

    it("'time' is defined and of type String", () => {
      expect(wrapper.vm.time).toBeDefined();
      expect(typeof wrapper.vm.time).toBe("string");
    });

    it("'time' has initial value of prop 'initialTime'", () => {
      expect(wrapper.vm.time).toBe(wrapper.props("initialTime"));
    });

    it("'time' changes when prop 'initialTime' is changed", () => {
      wrapper.setProps({ initialTime: "16:00" });
      expect(wrapper.vm.time).toBe("16:00");
    });
  });

  it("event 'timeChanged' emitted", () => {
    wrapper.vm.$emit("timeChanged", "12:00");
    expect(wrapper.emitted().timeChanged).toBeTruthy();
    expect(wrapper.emitted().timeChanged.length).toBe(1);
    expect(wrapper.emitted().timeChanged[0]).toEqual(["12:00"]);
  });

  it("time input value should match 'initialTime' value", () => {
    const timeInput = wrapper.find(".v-input").find("input");
    expect(timeInput.element.value).toBe(wrapper.props("initialTime"));
  });

  it("time input value should change when 'time' is changed", () => {
    const timeInput = wrapper.find(".v-input").find("input");
    expect(timeInput.element.value).toBe("13:00");
    wrapper.vm.time = "16:00";
    expect(timeInput.element.value).toBe("16:00");
  });
});
