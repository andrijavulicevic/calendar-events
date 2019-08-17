<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex>
        <v-layout justify-center>
          <v-flex md10>
            <CeCalendar :events="events" @openNewEvent="openCreateEvent" />

            <CeEventCreate
              v-if="showCreateEvent"
              :selectedDate="selectedDate"
              @close="closeCreateEvent"
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import CeCalendar from "../components/CeCalendar";
import CeEventCreate from "../components/CeEvent/CeEventCreate";

export default {
  name: "home",
  components: {
    CeCalendar,
    CeEventCreate
  },
  data: () => ({
    showCreateEvent: false,
    selectedDate: null
  }),
  computed: {
    ...mapGetters({
      events: "getEvents"
    })
  },
  methods: {
    openCreateEvent(date) {
      this.selectedDate = date;
      this.showCreateEvent = true;
    },
    closeCreateEvent() {
      this.showCreateEvent = false;
      this.selectedDate = null;
    }
  }
};
</script>
