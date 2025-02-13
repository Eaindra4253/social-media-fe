import { DateValue } from "@mantine/dates";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";

export function formatDateTimeZone(date: Date | string) {
  return new Date(date).toLocaleString("en-US", {
    timeZone: "Asia/Yangon",
  });
}

export function formatDateFilter(date?: DateValue) {
  if (!date) return undefined;
  dayjs.extend(timezone);
  return dayjs(date).tz("Asia/Yangon").format("YYYY-MM-DD");
}

export function getCurrentDateReport() {
  dayjs.extend(timezone);
  return dayjs().tz("Asia/Yangon").format("YYYY-MM-DD");
}
