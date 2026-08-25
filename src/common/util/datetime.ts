import dayjs from "dayjs";

/**
 * Returns a string that represents a date in the format used by the input
 * element of type "date".
 *
 * @param date - the Date object to format
 * @returns a string in the format YYYY-MM-DD
 *
 * @public
 */
export const dateToInputStr = (date: Date) => dayjs(date).format("YYYY-MM-DD");

/**
 * Returns of string representation of datetime from a Date object.
 *
 * @param date - the Date object to format
 * @returns a string in the format YYYY-MM-DDTHH:mm
 *
 * @public
 */
export const dateToDatetimeInputStr = (date: Date) =>
  dayjs(date).format("YYYY-MM-DDTHH:mm");
