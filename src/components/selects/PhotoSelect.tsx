import {
  Group,
  HoverCard,
  Image,
  Loader,
  Select,
  SelectProps,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useGetPhotos } from "./queries";

const renderSelectOption: SelectProps["renderOption"] = ({
  option,
  checked,
}) => (
  <Group flex="1" gap="xs">
    <HoverCard shadow="md" withinPortal position="left" withArrow>
      <HoverCard.Target>
        <Image
          src={`${import.meta.env.VITE_API_URL}/${option.value}`}
          alt={option.label}
          height={30}
          fit="contain"
        />
      </HoverCard.Target>
      <HoverCard.Dropdown p="4px">
        <Image
          src={`${import.meta.env.VITE_API_URL}/${option.value}`}
          alt={option.label}
          height={100}
          fit="contain"
        />
      </HoverCard.Dropdown>
    </HoverCard>
    {option.label}
    {checked && (
      <IconCheck
        style={{ marginInlineStart: "auto" }}
        size={18}
        stroke={1.5}
        color="currentColor"
        opacity={0.8}
      />
    )}
  </Group>
);

export function PhotoSelect({
  type,
  ...props
}: Omit<SelectProps, "data"> & {
  type?: "LOGO" | "CAROUSEL" | "BANNER";
}) {
  const { data, isLoading } = useGetPhotos(type);

  return (
    <Select
      allowDeselect
      clearable
      leftSection={isLoading ? <Loader size="xs" /> : null}
      data={data ?? []}
      disabled={isLoading}
      {...props}
      renderOption={renderSelectOption}
    />
  );
}
