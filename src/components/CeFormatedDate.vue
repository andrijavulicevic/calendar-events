<template>
  <span>{{ parsedDateString }}</span>
</template>

<script>
import { isSameDay } from "date-fns";
import { formatForDisplaying } from "../utils/date-utils";

export default {
  props: {
    start: {
      type: String,
      required: true
    },
    end: {
      type: String,
      required: true
    }
  },
  computed: {
    areDatesSameDate() {
      return isSameDay(this.start, this.end);
    },
    isTimeInString() {
      const time = this.start.split(" ")[1];
      return !!time;
    },
    parsedDateString() {
      if (this.areDatesSameDate && this.isTimeInString) {
        const [date, startTime] = this.start.split(" ");
        const endTime = this.end.split(" ")[1];
        return `${formatForDisplaying(date)}, ${startTime} - ${endTime}`;
      } else if (this.areDatesSameDate && !this.isTimeInString) {
        return formatForDisplaying(this.start);
      } else {
        return `${formatForDisplaying(this.start)} - ${formatForDisplaying(
          this.end
        )}`;
      }
    }
  }
};
</script>
