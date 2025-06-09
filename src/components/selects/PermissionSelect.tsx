import { MultiSelect, MultiSelectProps } from "@mantine/core";
import { useGetPermissionSelect } from "./queries";

export interface PermissionOption {
  value: string;
  label: string;
}

type PermissionsSelectProps = Omit<
  MultiSelectProps,
  "data" | "value" | "onChange"
>;

export function PermissionsSelect(props: PermissionsSelectProps) {
  const { data, isLoading } = useGetPermissionSelect();

  return (
    <MultiSelect
      data={data}
      clearable
      searchable
      disabled={isLoading}
      {...props}
    />
  );
}
