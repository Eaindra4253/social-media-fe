import { useParamsHelper } from "@/hooks/useParamHelper";
import { formatDateFilter } from "@/utils/date";
import { Select, SelectProps } from "@mantine/core";
import { DateInput, DateInputProps } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";

type OutletTypeSelectProps = Omit<SelectProps, "data">;

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
        {
          label: "Expired",
          value: "EXPIRED",
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

export function CouponTypeFilter() {
  const { setParams, getParam } = useParamsHelper();

  return (
    <Select
      searchable={false}
      clearable
      value={getParam("couponType")}
      onChange={(e) => {
        setParams({ couponType: e, page: 1 });
      }}
      size="xs"
      placeholder="Filter Coupon Type"
      data={[
        {
          label: "EMONEY",
          value: "EMONEY",
        },
        {
          label: "POINT",
          value: "POINT",
        },
      ]}
    />
  );
}

export function ImageTypeFilter() {
  const { setParams, getParam } = useParamsHelper();

  return (
    <Select
      searchable={false}
      clearable
      value={getParam("type")}
      onChange={(e) => {
        setParams({ type: e, page: 1 });
      }}
      size="xs"
      placeholder="Filter Image Type"
      data={[
        {
          label: "THUMBNAIL",
          value: "THUMBNAIL",
        },
        {
          label: "BANNER",
          value: "BANNER",
        },
        {
          label: "IMAGE_URL",
          value: "IMAGE_URL",
        },
        {
          label: "LOGO",
          value: "LOGO",
        },
      ]}
    />
  );
}

export function OutletTypeFilter(props: OutletTypeSelectProps) {
  const { setParam } = useParamsHelper();

  return (
    <Select
      searchable={false}
      size="xs"
      clearable
      placeholder="Filter Outlet Type"
      onChange={(value) => setParam("outletType", value)}
      data={[
        { value: "PREMIER", label: "PREMIER" },
        { value: "GNG", label: "GNG" },
        { value: "CAPITAL", label: "CAPITAL" },
      ]}
      {...props}
    />
  );
}

export function CouponStatusFilter() {
  const { setParam } = useParamsHelper();

  return (
    <Select
      clearable
      data={[
        {
          label: "ACTIVE",
          value: "true",
        },
        {
          label: "INACTIVE",
          value: "false",
        },
      ]}
      checkIconPosition="right"
      size="xs"
      placeholder="Status Filter"
      value={useParamsHelper().getParam("isActive")}
      onChange={(e) => {
        setParam("isActive", e);
      }}
    />
  );
}
