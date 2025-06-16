import { Select } from "@mantine/core";

interface VersionSelectProps {
  value: "V1" | "V2";
  onChange: (value: "V1" | "V2") => void;
}

export function VersionSelect({ value, onChange }: VersionSelectProps) {
  return (
    <Select
      label="Version"
      data={[
        { value: "V1", label: "V1" },
        { value: "V2", label: "V2" },
      ]}
      value={value}
      onChange={(v) => onChange(v as "V1" | "V2")}
      required
    />
  );
}
