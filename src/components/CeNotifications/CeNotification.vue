<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ event.name }}</v-list-item-title>
      <v-list-item-subtitle>{{ event.details }}</v-list-item-subtitle>
      <CeFormatedDate :start="event.start" :end="event.end" />
      <span>{{ event.location }}</span>
    </v-list-item-content>

    <v-list-item-action>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon color="blue" v-on="on" @click="accept(event.id)">
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </template>
        <span>Accept</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon color="red" v-on="on" @click="decline(event.id)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
        <span>Decline</span>
      </v-tooltip>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import {
  ACCEPT_EVENT_INVITE,
  DECLINE_EVENT_INVITE
} from "../../store/actions.type";
import CeFormatedDate from "../CeFormatedDate";

export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  components: { CeFormatedDate },
  methods: {
    accept(eventId) {
      this.$store.dispatch(ACCEPT_EVENT_INVITE, eventId);
    },
    decline(eventId) {
      this.$store.dispatch(DECLINE_EVENT_INVITE, eventId);
    }
  }
};
</script>
