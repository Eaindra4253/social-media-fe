import { DateValue } from "@mantine/dates";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";

export function formatDate(date: Date | string) {
  dayjs.extend(timezone);
  return dayjs(date).tz("Asia/Yangon").format("YYYY-MMM-DD hh:mm:ss A");
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
