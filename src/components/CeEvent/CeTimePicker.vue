<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value="time"
    transition="scale-transition"
    offset-y
    full-width
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="time"
        :label="label"
        prepend-icon="mdi-clock"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="menu"
      v-model="time"
      format="24hr"
      no-title
      full-width
      @click:minute="setTime"
    ></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    initialTime: {
      type: String,
      required: true
    }
  },
  data: () => ({
    menu: false,
    time: ""
  }),
  created() {
    this.time = this.initialTime;
  },
  watch: {
    initialTime(newVal) {
      this.time = newVal;
    }
  },
  methods: {
    setTime() {
      this.$emit("timeChanged", this.time);
      this.menu = false;
    }
  }
};
</script>
