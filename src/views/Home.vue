<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex>
        <v-layout justify-center>
          <v-flex md10>
            <CeCalendar :events="events" />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import CeCalendar from "../components/CeCalendar";
import { LOAD_EVENTS } from '../store/actions.type';

export default {
  name: "home",
  components: {
    CeCalendar
  },
  data: () => ({}),
  computed: {
    ...mapGetters({
      events: "getEvents"
    })
  }
};
</script>
