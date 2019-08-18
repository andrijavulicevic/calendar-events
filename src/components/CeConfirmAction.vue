<template>
  <v-dialog v-model="dialog" persistent max-width="420px">
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>{{ actionName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <p class="mt-5" v-html="actionMessage"></p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :loading="loading" @click="$emit('confirm')">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    actionName: {
      type: String,
      required: true
    },
    actionMessage: {
      type: String,
      required: true
    }
  },
  data: () => ({
    dialog: true
  }),
  computed: {
    ...mapGetters({
      loading: "getEventsLoading"
    })
  }
};
</script>
