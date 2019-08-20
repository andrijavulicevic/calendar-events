<template>
  <v-app-bar app>
    <v-toolbar-title class="headline">
      <span>Calendar Events</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <span v-if="user" data-cy="user-email" class="mr-5">{{ user.email }}</span>
    <CeNotifications class="mr-7" :pendingEvents="pendingEvents" />
    <v-btn data-cy="logout-btn" @click="logout">
      <span>Logout</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_CURRENT_USER, GET_PENDING_EVENTS } from "../store/getters.type";
import { LOGOUT } from "../store/actions.type";
import CeNotifications from "./CeNotifications/CeNotificationsModal";

export default {
  components: { CeNotifications },
  computed: {
    ...mapGetters({
      user: GET_CURRENT_USER,
      pendingEvents: GET_PENDING_EVENTS
    })
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT);
    }
  }
};
</script>
