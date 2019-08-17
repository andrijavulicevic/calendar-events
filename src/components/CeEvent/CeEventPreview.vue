<template>
  <v-card color="grey lighten-4" min-width="350px" flat>
    <v-toolbar :color="event.color" dark>
      <v-btn icon>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-toolbar-title v-html="event.name"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon @click="closeEventPreview">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <span v-html="event.details"></span>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="secondary" @click="closeEventPreview">
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeEventPreview() {
      this.$emit("closeEvent");
    }
  }
};
</script>
