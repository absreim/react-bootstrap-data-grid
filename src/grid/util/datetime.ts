import * as dayjs from "dayjs";

export const dateToInputStr = (date: Date) => (
  dayjs(date).format("YYYY-MM-DD")
)

export const dateToDatetimeInputStr = (date: Date) => (
  dayjs(date).format("YYYY-MM-DDTHH:mm")
)
