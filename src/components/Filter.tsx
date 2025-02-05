import { useParamsHelper } from "@/hooks/useParamHelper";
import { formatDateFilter } from "@/utils/date";
import { Select } from "@mantine/core";
import { DateInput, DateInputProps } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";

export function DateFilter(props: DateInputProps) {
  const { setParam } = useParamsHelper();

  return (
    <DateInput
      clearable
      maxDate={new Date()}
      size="xs"
      placeholder="Date Filter"
      leftSection={<IconCalendar size={16} />}
      valueFormat="YYYY-MM-DD"
      onChange={(e) => {
        setParam("date", formatDateFilter(e));
      }}
      {...props}
    />
  );
}

export function StatusFilter() {
  const { setParam } = useParamsHelper();

  return (
    <Select
      clearable
      data={[
        {
          label: "Active",
          value: "PURCHASED",
        },
        {
          label: "Used",
          value: "USED",
        },
      ]}
      checkIconPosition="right"
      size="xs"
      placeholder="Status Filter"
      value={useParamsHelper().getParam("status")}
      onChange={(e) => {
        setParam("status", e);
      }}
    />
  );
}
