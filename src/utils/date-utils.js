import { format } from "date-fns";

const DATE_FORMAT = "YYYY-MM-DD HH:mm";

function formatDate(date) {
  return format(date, DATE_FORMAT);
}

function getYear(date) {
  return format(date, "YYYY");
}

function getFullMonth(date) {
  return format(date, "MMMM");
}

function getDay(date) {
  return format(date, "DD");
}

function nthDay(dayNumber) {
  return dayNumber > 3 && dayNumber < 21
    ? "th"
    : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][
        dayNumber % 10
      ];
}

export { formatDate, getYear, getFullMonth, getDay, nthDay, DATE_FORMAT };
