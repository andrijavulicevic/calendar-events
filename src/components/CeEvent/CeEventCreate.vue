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
            <!-- <v-flex md5>
              
            </v-flex>
            <v-flex md5>
              <v-menu
                ref="menuTimeEnd"
                v-model="menuTimeEnd"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="chosenEnd.time"
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="chosenEnd.time"
                    label="End time"
                    prepend-icon="mdi-clock"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menuTimeEnd"
                  v-model="chosenEnd.time"
                  format="24hr"
                  no-title
                  full-width
                  @click:minute="$refs.menuTimeEnd.save(chosenEnd.time)"
                ></v-time-picker>
              </v-menu>
            </v-flex> -->
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

export default {
  props: {
    selectedDate: {
      type: Object,
      required: true
    }
  },
  components: { CeDatePicker },
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
    }
  },
  methods: {
    setStartDate(date) {
      this.chosenStart.date = date;
    },
    setEndDate(date) {
      this.chosenEnd.date = date;
    },
    calculateEndMinDate() {
      return addDays(new Date(this.chosenStart.date), -1).toISOString();
    },
    saveEvent() {
      console.log(this.newEvent);
      this.$validator.validate().then(valid => {
        if (!valid) return;
        this.newEvent.start = `${this.chosenStart.date} ${this.chosenStart.time}`.trim();
        this.newEvent.end = `${this.chosenEnd.date} ${this.chosenEnd.time}`.trim();
        this.$store.dispatch(CREATE_EVENT, this.newEvent).then(() => {
          this.$emit("close");
        });
      });
    }
  }
};
</script>
