<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      :min="minDate"
      @input="menu = false"
      no-title
      scrollable
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    initialDate: {
      type: String,
      required: true
    },
    minDate: {
      type: String
    }
  },
  data: () => ({
    menu: false,
    date: ""
  }),
  watch: {
    initialDate(newVal) {
      this.date = newVal;
    },
    date(newVal) {
      this.$emit("dateChanged", this.date);
    }
  }
};
</script>
