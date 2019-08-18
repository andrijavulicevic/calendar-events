<template>
  <v-app-bar app>
    <v-toolbar-title class="headline">
      <span>Calendar Events</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <span v-if="user" class="mr-5">{{ user.email }}</span>
    <CeNotifications class="mr-7" :pendingEvents="pendingEvents" />
    <v-btn @click="logout">
      <span>Logout</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT } from "../store/actions.type";
import CeNotifications from "./CeNotifications";

export default {
  components: { CeNotifications },
  computed: {
    ...mapGetters({ user: "getCurrentUser", pendingEvents: "getPendingEvents" })
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT);
    }
  }
};
</script>
