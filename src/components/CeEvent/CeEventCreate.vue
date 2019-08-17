<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Create New Event</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="newEvent.name"
            v-validate="'required'"
            :error-messages="errors.collect('newEvent.name')"
            label="Name"
            data-vv-name="newEvent.name"
            data-vv-name-as="name"
            required
          ></v-text-field>

          <v-layout justify-space-between>
            <v-flex md5>
              <v-menu
                ref="menuStart"
                v-model="menuStart"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="newEvent.start"
                    label="Start"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="newEvent.start"
                  @input="menuStart = false"
                  no-title
                  scrollable
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex md5>
              <v-menu
                ref="menuEnd"
                v-model="menuEnd"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="newEvent.end"
                    label="End"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="newEvent.end"
                  :min="minEndDate"
                  @input="menuEnd = false"
                  no-title
                  scrollable
                ></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>

          <v-select
            v-model="newEvent.visibility"
            :items="visibilityOptions"
            label="Visibility"
          ></v-select>

          <v-textarea
            v-model="newEvent.details"
            v-validate="'required'"
            :error-messages="errors.collect('newEvent.details')"
            label="Details"
            data-vv-name="newEvent.details"
            data-vv-as="details"
          ></v-textarea>

          <v-select
            v-model="newEvent.participants"
            :items="participants"
            label="Participants"
            multiple
          ></v-select>

          <v-text-field
            v-model="newEvent.location"
            v-validate="'required'"
            :error-messages="errors.collect('newEvent.location')"
            label="Location"
            data-vv-name="newEvent.location"
            data-vv-as="location"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close')">Close</v-btn>
        <v-btn color="blue darken-1" text :loading="loading" @click="saveEvent"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { addDays, isAfter } from "date-fns";
import { CREATE_EVENT } from "../../store/actions.type";

export default {
  props: {
    selectedDate: {
      type: Object,
      required: true
    }
  },
  created() {
    console.log(this.selectedDate);
    this.newEvent.start = this.selectedDate.date;
    this.newEvent.end = this.selectedDate.date;
  },
  data: () => ({
    dialog: true,
    menuStart: false,
    menuEnd: false,
    visibilityOptions: ["Private", "Public"],
    newEvent: {
      name: "",
      start: "",
      end: "",
      visibility: "Private",
      details: "",
      location: "",
      participants: [],
      color: "blue"
    }
  }),
  computed: {
    ...mapGetters({
      loading: "getEventsLoading",
      participants: "getAllParticipants"
    }),
    minEndDate() {
      return addDays(new Date(this.newEvent.start), -1).toISOString();
    }
  },
  watch: {
    "newEvent.start": {
      handler: function(newVal) {
        if (isAfter(new Date(newVal), new Date(this.newEvent.end))) {
          this.newEvent.end = newVal;
        }
      }
    }
  },
  methods: {
    saveEvent() {
      console.log(this.newEvent);
      this.$validator.validate().then(valid => {
        if (!valid) return;
        this.$store.dispatch(CREATE_EVENT, this.newEvent).then(() => {
          this.$emit("close");
        });
      });
    }
  }
};
</script>
