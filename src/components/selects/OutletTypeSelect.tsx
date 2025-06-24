import { Select, SelectProps } from "@mantine/core";

export type OutletTypeSelectProps = Omit<SelectProps, "data">;

export function OutletTypeSelect(props: OutletTypeSelectProps) {
  return (
    <Select
      data={[
        { value: "GNG", label: "g&g" },
        { value: "PREMIER", label: "Premier" },
        { value: "CAPITAL", label: "Capital" },
        { value: "HOTPOT_CITY", label: "Hotpot City" },
      ]}
      {...props}
    />
  );
}
