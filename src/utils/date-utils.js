import { format } from "date-fns";

const DATE_FORMAT = "YYYY-MM-DD HH:mm";

function formatDate(date) {
  return format(date, DATE_FORMAT);
}

function formatForDisplaying(date) {
  const time = date.split(" ")[1];
  if (time) return format(date, "MMM Do YYYY, HH:mm");
  return format(date, "MMM Do YYYY");
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

function getTime(date) {
  const dateString = formatDate(date);
  return dateString.split(" ")[1];
}

function nthDay(dayNumber) {
  return dayNumber > 3 && dayNumber < 21
    ? "th"
    : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][
        dayNumber % 10
      ];
}

function concatDateAndTime(date, time) {
  if (!time) return date;
  return `${date} ${time}`;
}

export {
  formatDate,
  getYear,
  getFullMonth,
  getDay,
  getTime,
  nthDay,
  concatDateAndTime,
  formatForDisplaying
};
