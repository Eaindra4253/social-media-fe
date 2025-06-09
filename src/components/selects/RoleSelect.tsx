import { Loader, Select, SelectProps } from "@mantine/core";
import { useGetRolesSelect } from "./queries";

export function RoleSelect(props: Omit<SelectProps, "data">) {
  const { data, isLoading } = useGetRolesSelect();

  return (
    <Select
      allowDeselect
      clearable
      leftSection={isLoading ? <Loader size="xs" /> : null}
      data={data ?? []}
      disabled={isLoading}
      {...props}
    />
  );
}
