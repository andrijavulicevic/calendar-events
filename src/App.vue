<template>
  <v-app>
    <CeHeader v-if="showAppHeader" />

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import CeHeader from "./components/CeHeader";

export default {
  name: "App",
  components: {
    CeHeader
  },
  data: () => ({
    //
  }),
  computed: {
    showAppHeader() {
      return this.$route.name !== "login" && this.$route.name !== "register";
    }
  }
};
</script>
