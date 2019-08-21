import { createLocalVue, mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";
import VeeValidate from "vee-validate";
import CeEventForm from "../../src/components/CeEvent/CeEventForm";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);
localVue.use(VeeValidate);

let vuetify, wrapper, $store;
const propsData = {
  formName: "Create event",
  formActionName: "Create",
  initialFormData: {
    start: "2019-08-22",
    end: "2019-08-23"
  }
};

describe("CeEventForm.vue", () => {
  beforeEach(() => {
    vuetify = new Vuetify();
    $store = {
      getters: {
        getEventsLoading: false,
        getAllParticipants: []
      }
    };
    wrapper = mount(CeEventForm, {
      localVue,
      vuetify,
      propsData,
      mocks: { $store }
    });
  });

  it("is a Vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("is an CeEventForm component", () => {
    expect(wrapper.is(CeEventForm)).toBeTruthy();
  });

  it("should match snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("CeEventForm props", () => {
    it("has 'formName' property", () => {
      expect(wrapper.props("formName")).toBeTruthy();
    });

    it("'formName' is of type String", () => {
      expect(typeof wrapper.props("formName")).toBe("string");
    });

    it("value of 'formName' is 'Create event'", () => {
      expect(wrapper.props("formName")).toBe("Create event");
    });

    it("has 'formActionName' property", () => {
      expect(wrapper.props("formActionName")).toBeTruthy();
    });

    it("'formActionName' is of type String", () => {
      expect(typeof wrapper.props("formActionName")).toBe("string");
    });

    it("vale of 'formActionName' is 'Create'", () => {
      expect(wrapper.props("formActionName")).toBe("Create");
    });

    it("has 'initialFormData' property", () => {
      expect(wrapper.props("initialFormData")).toBeTruthy();
    });

    it("'initialFormData' is of type Object", () => {
      expect(typeof wrapper.props("initialFormData")).toBe("object");
    });

    it("'initialFormData' prop has fields 'start' and 'end'", () => {
      expect(wrapper.props("initialFormData").start).toBeTruthy();
      expect(wrapper.props("initialFormData").end).toBeTruthy();
      expect(wrapper.props("initialFormData").start).toBe("2019-08-22");
      expect(wrapper.props("initialFormData").end).toBe("2019-08-23");
    });
  });

  describe("CeEventForm data", () => {
    it("has data", () => {
      expect(CeEventForm.data).toBeTruthy();
    });

    it("data is of type function", () => {
      expect(typeof CeEventForm.data).toBe("function");
    });

    it("'chosenStart' is defined and of type Object", () => {
      expect(wrapper.vm.chosenStart).toBeDefined();
      expect(typeof wrapper.vm.chosenStart).toBe("object");
    });

    it("'chosenStart' has initial value '{date: \"2019-08-22\", time: null}'", () => {
      expect(wrapper.vm.chosenStart.date).toBe("2019-08-22");
      expect(wrapper.vm.chosenStart.time).toBe(null);
    });

    it("'chosenEnd' is defined and of type Object", () => {
      expect(wrapper.vm.chosenEnd).toBeDefined();
      expect(typeof wrapper.vm.chosenEnd).toBe("object");
    });

    it("'chosenEnd' has initial value '{date: \"2019-08-23\", time: null}'", () => {
      expect(wrapper.vm.chosenEnd.date).toBe("2019-08-23");
      expect(wrapper.vm.chosenEnd.time).toBe(null);
    });

    it("'allDayEvent' is defined and of type Boolean", () => {
      expect(wrapper.vm.allDayEvent).toBeDefined();
      expect(typeof wrapper.vm.allDayEvent).toBe("boolean");
    });

    it("'allDayEvent' has initial value true", () => {
      expect(wrapper.vm.allDayEvent).toBe(true);
    });

    it("'visibilityOptions' is defined and of type Array", () => {
      expect(wrapper.vm.visibilityOptions).toBeDefined();
      expect(wrapper.vm.visibilityOptions instanceof Array).toBe(true);
    });

    it("'visibilityOptions' has length of 2", () => {
      expect(wrapper.vm.visibilityOptions.length).toBe(2);
    });

    it("'calendarEvent' is defined and of type Object", () => {
      expect(wrapper.vm.calendarEvent).toBeDefined();
      expect(typeof wrapper.vm.calendarEvent).toBe("object");
    });
  });

  describe("CeEventForm computed", () => {
    it("computed 'loading' is defined", () => {
      expect(wrapper.vm.loading).toBeDefined();
    });

    it("initial value of 'loading' is false", () => {
      expect(typeof CeEventForm.loading).toBe("boolean");
      expect(wrapper.vm.isPrivateEvent).toBe(false);
    });

    it("computed 'participants' is defined", () => {
      expect(wrapper.vm.participants).toBeDefined();
    });

    it("initial value of 'participants' is empty array", () => {
      expect(CeEventForm.participants instanceof Array).toBe(true);
      expect(wrapper.vm.participants.length).toBe(0);
    });

    it("computed 'isPrivateEvent' is defined", () => {
      expect(wrapper.vm.isPrivateEvent).toBeDefined();
    });

    it("initial value of 'isPrivateEvent' is true", () => {
      expect(wrapper.vm.isPrivateEvent).toBe(true);
    });

    it("value of 'isPrivateEvent' changes if 'calendarEvent.visibility changes'", () => {
      wrapper.setData({ calendarEvent: { visibility: "Public" } });
      expect(wrapper.vm.isPrivateEvent).toBe(false);
    });
  });
});
