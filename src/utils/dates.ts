import { format, parseISO } from "date-fns";

export function formatDate(dateObject = undefined) {
  if (!dateObject) return "Unknown date";
  if (!dateObject.createdAt) return "Unknown date";

  const date = parseISO(dateObject.createdAt);

  return format(date, "HH:mm d/MM");
  // return format(date, "HH:mm");
  // return format(date, "d MMMM yyyy @ HH:mm d MMMM");

  // My homework:
  // https://www.youtube.com/watch?v=RsFf7_9jUrw
}
