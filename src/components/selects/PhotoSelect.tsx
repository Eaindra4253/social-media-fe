import { Loader, Select, SelectProps } from "@mantine/core";
import { useGetPhotos } from "./queries";

export function PhotoSelect({
  type,
  ...props
}: Omit<SelectProps, "data"> & {
  type?: "LOGO" | "CAROUSEL" | "BANNER";
}) {
  const { data, isLoading } = useGetPhotos(type);

  return (
    <Select
      leftSection={isLoading ? <Loader size="xs" /> : null}
      data={data ?? []}
      disabled={isLoading}
      {...props}
    />
  );
}
