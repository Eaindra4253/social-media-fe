import { useGetPermissionSelect } from "@/pages/permissions/quries";
import { MultiSelect, MultiSelectProps } from "@mantine/core";

export interface PermissionOption {
  value: string;
  label: string;
}

type PermissionsSelectProps = Omit<MultiSelectProps, "data" | "value" | "onChange">;

export function PermissionsSelect(props: PermissionsSelectProps) {
  const { data: permissionOptions = [], isLoading } = useGetPermissionSelect();

  return (
    <MultiSelect
      data={permissionOptions}
      clearable
      searchable
      disabled={isLoading}
      {...props} 
    />
  );
}

