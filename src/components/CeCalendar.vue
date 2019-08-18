<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn outlined v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :event-margin-bottom="3"
          :event-ripple="true"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:date="viewDay"
          @click:more="viewDay"
          @click:day="openCreateEvent"
          @click:time="openCreateEvent"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          full-width
          offset-x
        >
          <CeEventPreviw
            :event="selectedEvent"
            @closeEvent="selectedOpen = false"
            @deleteEvent="openDeleteEvent"
            @editEvent="openEditEvent"
          />
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import {
  formatDate,
  getYear,
  getFullMonth,
  getDay,
  nthDay
} from "../utils/date-utils";
import CeEventPreviw from "./CeEvent/CeEventPreview";

export default {
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  components: {
    CeEventPreviw
  },
  data: () => ({
    today: formatDate(new Date()),
    focus: formatDate(new Date()),
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day"
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false
  }),
  computed: {
    title() {
      const { start, end } = this;
      let startYear, startMonth, startDay;
      if (!start || !end) {
        startMonth = getFullMonth(this.today);
        startYear = getYear(this.today);
        startDay = getDay(this.today) + nthDay(getDay(this.today));
      } else {
        startMonth = this.monthFormatter(start);
        startYear = start.year;
        startDay = start.day + nthDay(start.day);
      }

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    },
    openCreateEvent(date) {
      // round time to 30 minutes intervals
      if (date.time) {
        const [hour, minutes] = date.time.split(":");
        if (Number.parseInt(minutes) >= 30) {
          date.time = `${hour}:${30}`;
        } else {
          date.time = `${hour}:00`;
        }
      }
      this.$emit("openNewEvent", date);
    },
    openDeleteEvent() {
      this.$emit("openDeleteEvent", this.selectedEvent);
    },
    openEditEvent() {
      this.$emit("openEditEvent", this.selectedEvent);
    }
  }
};
</script>
