import dayjs from "dayjs";

export const dateToInputStr = (date: Date) => dayjs(date).format("YYYY-MM-DD");

export const dateToDatetimeInputStr = (date: Date) =>
  dayjs(date).format("YYYY-MM-DDTHH:mm");

// All dates and datetimes that the grid displays are in UTC. The datetime
// string in the value attribute of a input element of type datetime-local
// is based on the local timezone of the client.
export const datetimeInputStrToUtc: (datetimeStr: string) => string = (
  datetimeStr,
) => datetimeStr + "Z";
