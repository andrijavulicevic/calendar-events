<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>{{ formName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="calendarEvent.name"
          v-validate="'required'"
          :error-messages="errors.collect('calendarEvent.name')"
          label="Name"
          data-vv-name="calendarEvent.name"
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
          v-model="calendarEvent.visibility"
          :items="visibilityOptions"
          label="Visibility"
        ></v-select>

        <v-textarea
          v-model="calendarEvent.details"
          v-validate="'required'"
          :error-messages="errors.collect('calendarEvent.details')"
          label="Details"
          data-vv-name="calendarEvent.details"
          data-vv-as="details"
          rows="3"
        ></v-textarea>

        <v-select
          v-show="isPrivateEvent"
          v-model="calendarEvent.participants"
          :items="participants"
          label="Participants"
          multiple
        ></v-select>

        <v-text-field
          v-model="calendarEvent.location"
          v-validate="'required'"
          :error-messages="errors.collect('calendarEvent.location')"
          label="Location"
          data-vv-name="calendarEvent.location"
          data-vv-as="location"
          required
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        :loading="loading"
        @click="executeFormAction"
        >{{ formActionName }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { addDays, isAfter } from "date-fns";
import {
  GET_EVENTS_LOADING,
  GET_ALL_PARTICIPANTS
} from "../../store/getters.type";
import { concatDateAndTime } from "../../utils/date-utils";
import CeDatePicker from "./CeDatePicker";
import CeTimePicker from "./CeTimePicker";

export default {
  props: {
    formName: {
      type: String,
      required: true
    },
    formActionName: {
      type: String,
      required: true
    },
    initialFormData: {
      type: Object
    }
  },
  components: {
    CeDatePicker,
    CeTimePicker
  },
  created() {
    if (this.initialFormData) {
      this.calendarEvent = {
        ...this.calendarEvent,
        ...this.initialFormData
      };
      if (this.initialFormData.participants) {
        this.calendarEvent.participants = [
          ...this.initialFormData.participants
        ];
      }
    }
  },
  mounted() {
    const [startDate, startTime] = this.calendarEvent.start.split(" ");
    const [endDate, endTime] = this.calendarEvent.end.split(" ");
    this.chosenStart.date = startDate;
    this.chosenEnd.date = endDate;
    this.chosenEnd.minDate = this.calculateEndMinDate();
    if (startTime) {
      this.allDayEvent = false;
      this.chosenStart.time = startTime;
      this.chosenEnd.time = endTime;
    }
  },
  data: () => ({
    chosenStart: {
      date: "",
      time: null
    },
    chosenEnd: {
      date: "",
      minDate: "",
      time: null
    },
    allDayEvent: true,
    visibilityOptions: ["Private", "Public"],
    calendarEvent: {
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
      loading: GET_EVENTS_LOADING,
      participants: GET_ALL_PARTICIPANTS
    }),
    isPrivateEvent() {
      return this.calendarEvent.visibility === "Private";
    }
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
    },
    isPrivateEvent(newVal) {
      if (!newVal) {
        this.calendarEvent.participants = [];
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
      this.chosenStart.time = time;
    },
    setEndTime(time) {
      this.chosenEnd.time = time;
    },
    calculateEndMinDate() {
      return addDays(new Date(this.chosenStart.date), -1).toISOString();
    },
    executeFormAction() {
      this.$validator.validate().then(valid => {
        if (!valid) return;
        this.calendarEvent.start = concatDateAndTime(
          this.chosenStart.date,
          this.chosenStart.time
        );
        this.calendarEvent.end = concatDateAndTime(
          this.chosenEnd.date,
          this.chosenEnd.time
        );
        this.$emit("eventUpdated", this.calendarEvent);
      });
    }
  }
};
</script>
