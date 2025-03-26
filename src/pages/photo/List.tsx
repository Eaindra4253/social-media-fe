import { Button, Flex, Group, Stack, Title } from "@mantine/core";
import { useGetPhotos, useUploadPhoto } from "./queries";
import { DataTable } from "@/components/table/DataTable";
import { MRT_ColumnDef } from "mantine-react-table";
import { formatDateTimeZone } from "@/utils/date";
import { PhotoDeleteForm } from "./Form";
import { ImagePreviewButton } from "@/components/ImagePreviewButton";
import { ImageUploadButton } from "./ImageUploadButton";
import { useDisclosure } from "@mantine/hooks";
import { ImageTypeFilter } from "@/components/Filter";
import { IconUpload } from "@tabler/icons-react";

export function PhotoList() {
  const { data, isLoading } = useGetPhotos();
  const { mutate: uploadPhoto } = useUploadPhoto();
  const [opened, { open, close }] = useDisclosure(false);

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
    {
      accessorKey: "createdAt",
      header: "Created At",
      size: 100,
      Cell: ({ row }) => {
        return row.original.createdAt !== "-"
          ? formatDateTimeZone(row.original.createdAt)
          : "-";
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      size: 100,
      Cell: ({ row }) => {
        return row.original.updatedAt !== "-"
          ? formatDateTimeZone(row.original.updatedAt)
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
        <ImageUploadButton
          opened={opened}
          onClose={close}
          uploadPhoto={uploadPhoto}
        />
        <Group>
          <ImageTypeFilter />
          <Button
            onClick={open}
            leftSection={<IconUpload />}
            radius="md"
            size="xs"
          >
            Upload Image
          </Button>
        </Group>
      </Group>
      <DataTable<Image>
        data={data ?? []}
        columns={columns}
        isLoading={isLoading}
        columnPinning={{
          right: ["_id"],
        }}
      />
    </Stack>
  );
}
