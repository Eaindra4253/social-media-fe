import { ImageTypeFilter, OutletTypeFilter } from "@/components/Filter";
import { ImagePreviewButton } from "@/components/ImagePreviewButton";
import { DataTable } from "@/components/table/DataTable";
import { formatDateTimeZone } from "@/utils/date";
import { Flex, Group, Stack, Title } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useAuthStore } from "@/stores/auth.store";
import { PhotoDeleteForm } from "./Form";
import { ImageUploadButton } from "./ImageUploadButton";
import { useGetPhotos } from "./queries";

export function PhotoList() {
  const { data, isLoading } = useGetPhotos();
  const user = useAuthStore((state) => state.user);

  const columns: MRT_ColumnDef<Image>[] = [
    {
      accessorKey: "url",
      header: "Image",
      size: 100,
      Cell: ({ row }) =>
        row.original.url ? (
          <Flex align="center" justify="flex-start" gap="xs">
            <ImagePreviewButton
              imageUrl={`${import.meta.env.VITE_API_URL}/${row.original.url}`}
              label={row.original.url}
            />
          </Flex>
        ) : (
          "-"
        ),
    },
    { accessorKey: "type", header: "Type", size: 100 },
    { accessorKey: "filename", header: "Filename", size: 100 },
    ...(!user?.outletType
      ? [
          {
            accessorKey: "outletType",
            header: "Outlet Type",
            size: 100,
          },
        ]
      : []),
    {
      accessorKey: "createdAt",
      header: "Created At",
      Cell: ({ row }) => {
        return row.original.createdAt !== "-"
          ? formatDateTimeZone(row.original.createdAt)
          : "-";
      },
    },
    {
      accessorKey: "_id",
      header: "Actions",
      size: 100,
      Cell: ({ row }) => {
        return (
          <Flex gap="xs">
            <PhotoDeleteForm id={row.original.id} />
          </Flex>
        );
      },
    },
  ];

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={3}>PHOTO LIST</Title>
        <Group>
          <OutletTypeFilter />
          <ImageTypeFilter />
          <ImageUploadButton />
        </Group>
      </Group>
      <DataTable<Image>
        data={data?.data ?? []}
        columns={columns}
        isLoading={isLoading}
        total={data?.totalCount ?? 0}
      />
    </Stack>
  );
}
