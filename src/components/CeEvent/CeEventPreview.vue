<template>
  <v-card min-width="350px" flat>
    <v-toolbar :color="event.color" dark>
      <v-btn icon>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-toolbar-title v-html="event.name"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="openDelete">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon @click="closeEventPreview">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-layout justify-start>
        <v-flex>
          <v-sheet class="mt-3 mb-5">{{ event.details }}</v-sheet>
        </v-flex>
      </v-layout>
      <v-layout justify-start>
        <v-flex> <v-icon>mdi-map-marker</v-icon> {{ event.location }} </v-flex>
      </v-layout>
      <v-layout justify-start class="ce-preview-block">
        <v-flex>
          <v-list>
            <v-subheader>{{ event.participants.length }} guests</v-subheader>
            <v-list-item v-for="participant in participants" :key="participant">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>{{ participant }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-flex>
      </v-layout>
    </v-card-text>
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
  computed: {
    participants() {
      return this.event.participants.map(participant => participant.email);
    }
  },
  methods: {
    closeEventPreview() {
      this.$emit("closeEvent");
    },
    openDelete() {
      this.$emit("deleteEvent");
    }
  }
};
</script>

<style>
.ce-preview-block .v-subheader,
.ce-preview-block .v-list-item {
  padding-left: 0;
}
</style>
