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
          <template v-if="pendingEvents.length" v-slot:badge>
            {{ pendingEvents.length }}
          </template>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-card>
      <div v-if="!pendingEvents.length" class="pa-5">
        No events invitation pending
      </div>
      <v-list v-else max-width="450px">
        <CeNotification
          v-for="event in pendingEvents"
          :key="event.id"
          :event="event"
        />
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import CeNotification from "./CeNotification";

export default {
  props: {
    pendingEvents: {
      type: Array,
      required: true
    }
  },
  components: { CeNotification },
  data: () => ({
    menu: false
  })
};
</script>
