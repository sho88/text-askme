import { format, parseISO } from "date-fns";

export function formatDate(dateObject = undefined) {
  if (!dateObject) {
    console.log("formatDate function called with undefined dateObject");
    return "Unknown date";
  }

  const date = parseISO(dateObject.createdAt);

  // return format(date, "HH:mm");
  return format(date, "HH:mm d/MM");
  // return format(date, "d MMMM yyyy @ HH:mm d MMMM");

  // https://www.youtube.com/watch?v=RsFf7_9jUrw
}
