<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex>
        <v-layout justify-center>
          <v-flex md10>
            <CeCalendar
              :events="events"
              @openNewEvent="openCreateEvent"
              @openDeleteEvent="openDeleteConfirmation"
              @openEditEvent="openEditEvent"
            />

            <CeEventCreate
              v-if="showCreateEvent"
              :selectedDate="selectedDate"
              @close="closeCreateEvent"
            />

            <CeEventEdit
              v-if="showEditEvent"
              :event="selectedEvent"
              @close="closeEditEvent"
            />

            <CeConfirmAction
              v-if="showDeleteEvent"
              actionName="Delete event?"
              :actionMessage="actionMessage"
              @close="closeDeleteConfirmation"
              @confirm="deleteEvent"
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { LOAD_ALL_PARTICIPANTS, DELETE_EVENT } from "../store/actions.type";
import { GET_EVENTS } from "../store/getters.type";

import CeCalendar from "../components/CeCalendar";
import CeEventCreate from "../components/CeEvent/CeEventCreate";
import CeEventEdit from "../components/CeEvent/CeEventEdit";
import CeConfirmAction from "../components/CeConfirmAction";

export default {
  name: "home",
  components: {
    CeCalendar,
    CeEventCreate,
    CeEventEdit,
    CeConfirmAction
  },
  data: () => ({
    showCreateEvent: false,
    showDeleteEvent: false,
    showEditEvent: false,
    selectedAction: "",
    selectedDate: null,
    selectedEvent: null
  }),
  computed: {
    ...mapGetters({
      events: GET_EVENTS
    }),
    actionMessage() {
      return `Are you sure you want to delete <span class="font-weight-bold">${this.selectedEvent.name}</span> from calendar? 
        This action can not be undone.`;
    }
  },
  methods: {
    openCreateEvent(date) {
      this.$store.dispatch(LOAD_ALL_PARTICIPANTS);
      this.selectedDate = date;
      this.showCreateEvent = true;
    },
    closeCreateEvent() {
      this.showCreateEvent = false;
      this.selectedDate = null;
    },
    openDeleteConfirmation(event) {
      this.selectedAction = DELETE_EVENT;
      this.selectedEvent = event;
      this.showDeleteEvent = true;
    },
    closeDeleteConfirmation() {
      this.showDeleteEvent = false;
      this.selectedEvent = null;
      this.selectedAction = "";
    },
    openEditEvent(event) {
      this.$store.dispatch(LOAD_ALL_PARTICIPANTS);
      this.selectedEvent = event;
      this.showEditEvent = true;
    },
    closeEditEvent() {
      this.showEditEvent = false;
      this.selectedEvent = null;
    },
    async deleteEvent() {
      await this.$store.dispatch(DELETE_EVENT, this.selectedEvent);
      this.closeDeleteConfirmation();
    }
  }
};
</script>
