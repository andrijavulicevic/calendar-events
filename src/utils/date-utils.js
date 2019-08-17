import { format } from "date-fns";

const DATE_FORMAT = "YYYY-MM-DD HH:mm";

function formatDate(date) {
  return format(date, DATE_FORMAT);
}

export { formatDate, DATE_FORMAT };
