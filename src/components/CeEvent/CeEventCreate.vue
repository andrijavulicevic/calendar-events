<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Create New Event</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="newEvent.name"
            v-validate="'required'"
            :error-messages="errors.collect('newEvent.name')"
            label="Name"
            data-vv-name="newEvent.name"
            data-vv-as="name"
            required
          ></v-text-field>

          <v-layout justify-space-between>
            <v-flex md5>
              <CeDatePicker
                label="Start date"
                :initialDate="chosenStart.date"
                @dateChanged="setStartDate"
              />
            </v-flex>
            <v-flex md5>
              <CeDatePicker
                label="End date"
                :initialDate="chosenEnd.date"
                :minDate="chosenEnd.minDate"
                @dateChanged="setEndDate"
              />
            </v-flex>
          </v-layout>

          <v-layout justify-space-between v-if="!allDayEvent">
            <v-flex md5>
              <CeTimePicker
                label="Start time"
                :initialTime="chosenStart.time"
                @timeChanged="setStartTime"
              />
            </v-flex>
            <v-flex md5>
              <CeTimePicker
                label="End time"
                :initialTime="chosenEnd.time"
                @timeChanged="setEndTime"
              />
            </v-flex>
          </v-layout>

          <v-checkbox v-model="allDayEvent" label="All day event"></v-checkbox>

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
        <v-btn color="blue darken-1" text :loading="loading" @click="saveEvent"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { addDays, isAfter, addMinutes } from "date-fns";
import { CREATE_EVENT } from "../../store/actions.type";
import { getTime } from "../../utils/date-utils";
import CeDatePicker from "./CeDatePicker";
import CeTimePicker from "./CeTimePicker";

export default {
  props: {
    selectedDate: {
      type: Object,
      required: true
    }
  },
  components: { CeDatePicker, CeTimePicker },
  mounted() {
    this.chosenStart.date = this.selectedDate.date;
    this.chosenEnd.date = this.selectedDate.date;
    this.chosenEnd.minDate = this.calculateEndMinDate();
    if (this.selectedDate.time) {
      this.allDayEvent = false;
      this.chosenStart.time = this.selectedDate.time;
      this.chosenEnd.time = getTime(
        addMinutes(
          new Date(`${this.selectedDate.date} ${this.selectedDate.time}`),
          30
        )
      );
    }
  },
  data: () => ({
    dialog: true,
    chosenStart: {
      date: "",
      time: null
    },
    chosenEnd: {
      date: "",
      minDate: "",
      time: null
    },
    menuTimeStart: false,
    menuTimeEnd: false,
    allDayEvent: true,
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
    })
  },
  watch: {
    "chosenStart.date": {
      handler: function(newVal) {
        if (isAfter(new Date(newVal), new Date(this.chosenEnd.date))) {
          this.chosenEnd.date = newVal;
          this.chosenEnd.minDate = this.calculateEndMinDate();
        }
      }
    },
    allDayEvent(newVal) {
      if (!newVal) {
        if (!this.chosenStart.time) {
          this.chosenStart.time = "12:00";
          this.chosenEnd.time = "12:30";
        }
      } else {
        this.chosenStart.time = null;
        this.chosenEnd.time = null;
      }
    }
  },
  methods: {
    setStartDate(date) {
      this.chosenStart.date = date;
    },
    setEndDate(date) {
      this.chosenEnd.date = date;
    },
    setStartTime(time) {
      console.log(time);
      this.chosenStart.time = time;
    },
    setEndTime(time) {
      this.chosenEnd.time = time;
    },
    calculateEndMinDate() {
      return addDays(new Date(this.chosenStart.date), -1).toISOString();
    },
    concatDateAndTime(date, time) {
      if (!time) return date;
      return `${date} ${time}`;
    },
    saveEvent() {
      console.log(this.newEvent);
      this.$validator.validate().then(valid => {
        if (!valid) return;
        this.newEvent.start = this.concatDateAndTime(
          this.chosenStart.date,
          this.chosenStart.time
        );
        this.newEvent.end = this.concatDateAndTime(
          this.chosenEnd.date,
          this.chosenEnd.time
        );
        this.$store.dispatch(CREATE_EVENT, this.newEvent).then(() => {
          this.$emit("close");
        });
      });
    }
  }
};
</script>
