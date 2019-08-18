<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <CeEventForm
      formName="Edit Event"
      formActionName="Update"
      :initialFormData="adaptedEvent"
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
  computed: {
    participants() {
      return this.event.participants.map(participant => participant.email);
    },
    adaptedEvent() {
      return {
        ...this.event,
        participants: this.participants
      };
    }
  },
  methods: {
    updateEvent(updatedEvent) {
      const originalParticipants = this.event.participants;
      const updatedParticipants = updatedEvent.participants;
      updatedEvent.participants = [];
      for (const participant of updatedParticipants) {
        const originalParticipant = originalParticipants.find(
          o => o.email === participant
        );
        if (originalParticipant) {
          updatedEvent.participants.push(originalParticipant);
        } else {
          updatedEvent.participants.push({
            email: participant,
            accepted: false
          });
        }
      }
      this.$store.dispatch(UPDATE_EVENT, updatedEvent).then(() => {
        this.$emit("close");
      });
    }
  }
};
</script>
