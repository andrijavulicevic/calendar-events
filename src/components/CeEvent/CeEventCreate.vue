<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <CeEventForm
      formName="Create New Event"
      formActionName="Save"
      :initialFormData="newCalendarEvent"
      @eventUpdated="saveEvent"
      @close="$emit('close')"
    />
  </v-dialog>
</template>

<script>
import { addMinutes } from "date-fns";
import { CREATE_EVENT } from "../../store/actions.type";
import { getTime, concatDateAndTime } from "../../utils/date-utils";
import CeEventForm from "./CeEventForm";

export default {
  props: {
    selectedDate: {
      type: Object,
      required: true
    }
  },
  components: { CeEventForm },
  created() {
    const { date, time } = this.selectedDate;
    if (time) {
      this.newCalendarEvent.start = concatDateAndTime(date, time);
      this.newCalendarEvent.end = concatDateAndTime(
        date,
        getTime(addMinutes(new Date(this.newCalendarEvent.start), 30))
      );
    } else {
      this.newCalendarEvent.start = date;
      this.newCalendarEvent.end = date;
    }
  },
  data: () => ({
    dialog: true,
    newCalendarEvent: {
      start: "",
      end: ""
    }
  }),
  methods: {
    saveEvent(newEvent) {
      console.log(newEvent);
      this.$store.dispatch(CREATE_EVENT, newEvent).then(() => {
        this.$emit("close");
      });
    }
  }
};
</script>
