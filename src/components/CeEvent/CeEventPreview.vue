<template>
  <v-card min-width="350px" flat>
    <v-toolbar :color="event.color" dark>
      <v-btn v-if="enabledEditAndDelete" icon @click="openEdit">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-toolbar-title v-html="event.name"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="enabledEditAndDelete" icon @click="openDelete">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon @click="closeEventPreview">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-layout>
        <v-flex class="mb-5">
          <v-icon>mdi-calendar</v-icon>
          <CeFormatedDate class="ml-3" :start="event.start" :end="event.end" />
        </v-flex>
      </v-layout>
      <v-layout class="mb-5">
        <v-icon v-if="isPublicEvent">mdi-earth</v-icon>
        <v-icon v-else>mdi-account-group</v-icon>
        <span class="ml-3">{{ event.visibility }}</span>
      </v-layout>
      <v-layout justify-start>
        <v-flex class="mb-5">
          <v-icon>mdi-card-text</v-icon>
          <span class="ml-3">{{ event.details }}</span>
        </v-flex>
      </v-layout>
      <v-layout justify-start>
        <v-flex>
          <v-icon>mdi-map-marker</v-icon>
          <span class="ml-3">{{ event.location }}</span>
        </v-flex>
      </v-layout>
      <v-layout justify-start class="ce-preview-block">
        <v-flex v-if="event.participants">
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
import { mapGetters } from "vuex";
import { GET_IS_ORGANIZER } from "../../store/getters.type";
import CeFormatedDate from "../CeFormatedDate";

export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  components: { CeFormatedDate },
  computed: {
    participants() {
      if (this.event.participants)
        return this.event.participants.map(participant => participant.email);
      return null;
    },
    ...mapGetters({
      isOrganizer: GET_IS_ORGANIZER
    }),
    enabledEditAndDelete() {
      return this.event.owned || this.isOrganizer;
    },
    isPublicEvent() {
      return this.event.visibility === "Public";
    }
  },
  methods: {
    closeEventPreview() {
      this.$emit("closeEvent");
    },
    openDelete() {
      this.$emit("deleteEvent");
    },
    openEdit() {
      this.$emit("editEvent");
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
