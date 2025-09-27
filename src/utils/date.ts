import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export function configureDayjs() {
  dayjs.extend(relativeTime);
}
