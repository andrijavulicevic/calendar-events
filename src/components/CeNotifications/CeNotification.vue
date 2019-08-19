<template>
  <div>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ event.name }}</v-list-item-title>
      <CeFormatedDate :start="event.start" :end="event.end" />
    </v-list-item-content>

    <v-list-item-action>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon small color="blue" v-on="on" @click="accept(event.id)">
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </template>
        <span>Accept</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon small color="red" v-on="on" @click="decline(event.id)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
        <span>Decline</span>
      </v-tooltip>
    </v-list-item-action>
  </v-list-item>
  <v-divider></v-divider>
  </div>
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
