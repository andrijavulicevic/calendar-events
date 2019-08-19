<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-btn icon class="mr-7" v-on="on">
        <v-badge color="red" overlap>
          <template v-if="pendingEvents.length" v-slot:badge>{{
            pendingEvents.length
          }}</template>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-card>
      <div v-if="!pendingEvents.length" class="pa-5">
        No events invitation pending
      </div>
      <v-list v-else max-width="450px">
        <v-list-item
          v-for="pendingEvent in pendingEvents"
          :key="pendingEvent.id"
        >
          <v-list-item-content>
            <v-list-item-title>{{ pendingEvent.name }}</v-list-item-title>
            <v-list-item-subtitle>{{
              pendingEvent.details
            }}</v-list-item-subtitle>
            <CeFormatedDate :start="pendingEvent.start" :end="pendingEvent.end" />
            <span>{{ pendingEvent.location }}</span>
          </v-list-item-content>

          <v-list-item-action>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  color="blue"
                  v-on="on"
                  @click="accept(pendingEvent.id)"
                >
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </template>
              <span>Accept</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  color="red"
                  v-on="on"
                  @click="decline(pendingEvent.id)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
              <span>Decline</span>
            </v-tooltip>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import {
  ACCEPT_EVENT_INVITE,
  DECLINE_EVENT_INVITE
} from "../store/actions.type";
export default {
  props: {
    pendingEvents: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    menu: false
  }),
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
