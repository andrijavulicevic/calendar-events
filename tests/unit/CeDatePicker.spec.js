import { createLocalVue, mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import CeDatePicker from "../../src/components/CeEvent/CeDatePicker";

const localVue = createLocalVue();
localVue.use(Vuetify);
let vuetify;
let wrapper;

const propsData = {
  label: "Choose date",
  initialDate: "2019-08-20"
};

const createComponent = () =>
  mount(CeDatePicker, { localVue, vuetify, propsData });

describe("CeDatePicker.vue", () => {
  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = createComponent();
  });

  it("is a Vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("is an CeDatePicker component", () => {
    expect(wrapper.is(CeDatePicker)).toBeTruthy();
  });

  it("should match snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("CeDatePicker props", () => {
    it("has 'label' property", () => {
      expect(wrapper.props("label")).toBeTruthy();
    });

    it("'label' is of type String", () => {
      expect(typeof wrapper.props("label")).toBe("string");
    });

    it("value of 'label' is 'Start date'", () => {
      expect(wrapper.props("label")).toBe("Choose date");
    });

    it("has 'initialDate' property", () => {
      expect(wrapper.props("initialDate")).toBeTruthy();
    });

    it("'initialDate' is of type String", () => {
      expect(typeof wrapper.props("initialDate")).toBe("string");
    });

    it("vale of 'initialDate' is '2019-08-20'", () => {
      expect(wrapper.props("initialDate")).toBe("2019-08-20");
    });
  });

  describe("CeDatePicker data", () => {
    it("has data", () => {
      expect(CeDatePicker.data).toBeTruthy();
    });

    it("data is of type function", () => {
      expect(typeof CeDatePicker.data).toBe("function");
    });

    it("'menu' is defined and of type Boolean", () => {
      expect(wrapper.vm.menu).toBeDefined();
      expect(typeof wrapper.vm.menu).toBe("boolean");
    });

    it("'menu' has initial value false", () => {
      expect(wrapper.vm.menu).toBe(false);
    });

    it("'date' is defined and of type String", () => {
      expect(wrapper.vm.date).toBeDefined();
      expect(typeof wrapper.vm.date).toBe("string");
    });

    it("'date' has initial value '2019-08-20'", () => {
      expect(wrapper.vm.date).toBe("2019-08-20");
    });

    it("'date' changes when prop 'initialDate' is changed", () => {
      wrapper.setProps({ initialDate: "2019-08-21" });
      expect(wrapper.vm.date).toBe("2019-08-21");
    });
  });

  it("event 'dateChanged' emitted", () => {
    wrapper.vm.$emit("dateChanged");
    expect(wrapper.emitted().dateChanged).toBeTruthy();
    expect(wrapper.emitted().dateChanged.length).toBe(2);
    expect(wrapper.emitted().dateChanged[0]).toEqual(["2019-08-20"]);
  });

  it("date input value should match 'initialDate' value", () => {
    const timeInput = wrapper.find(".v-input").find("input");
    expect(timeInput.element.value).toBe(wrapper.props("initialDate"));
  });

  it("date input value should change when 'date' is changed", () => {
    const timeInput = wrapper.find(".v-input").find("input");
    expect(timeInput.element.value).toBe("2019-08-20");
    wrapper.vm.date = "2019-08-23";
    expect(timeInput.element.value).toBe("2019-08-23");
  });
});
