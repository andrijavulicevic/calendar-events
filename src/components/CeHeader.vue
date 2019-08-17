<template>
  <v-app-bar app>
    <v-toolbar-title class="headline">
      <span>Calendar Events</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <span v-if="user" class="mr-5">{{ user.email }}</span>
    <v-btn @click="logout">
      <span>Logout</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT } from "../store/actions.type";

export default {
  computed: {
    ...mapGetters({ user: "getCurrentUser" })
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT);
    }
  }
};
</script>
