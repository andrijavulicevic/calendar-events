<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <CeEventForm
      formName="Edit Event"
      formActionName="Update"
      :initialFormData="event"
      @eventUpdated="updateEvent"
      @close="$emit('close')"
    />
  </v-dialog>
</template>

<script>
import { UPDATE_EVENT } from "../../store/actions.type";
import CeEventForm from "./CeEventForm";

export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  components: {
    CeEventForm
  },
  data: () => ({
    dialog: true
  }),
  methods: {
    updateEvent(updatedEvent) {
      console.log(updatedEvent);
      this.$store.dispatch(UPDATE_EVENT, updatedEvent).then(() => {
        this.$emit("close");
      });
    }
  }
};
</script>
