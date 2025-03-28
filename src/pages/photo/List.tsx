import { ImageTypeFilter } from "@/components/Filter";
import { ImagePreviewButton } from "@/components/ImagePreviewButton";
import { DataTable } from "@/components/table/DataTable";
import { formatDateTimeZone } from "@/utils/date";
import { Button, Flex, Group, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUpload } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { ImageUploadButton } from "./ImageUploadButton";
import { useGetPhotos, useUploadPhoto } from "./queries";

export function PhotoList() {
  const { data, isFetching } = useGetPhotos();
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
      size: 150,
      Cell: ({ row }) => {
        return row.original.createdAt !== "-"
          ? formatDateTimeZone(row.original.createdAt)
          : "-";
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      size: 150,
      Cell: ({ row }) => {
        return row.original.updatedAt !== "-"
          ? formatDateTimeZone(row.original.updatedAt)
          : "-";
      },
    },
    // {
    //   accessorKey: "_id",
    //   header: "Actions",
    //   size: 100,
    //   Cell: ({ row }) => {
    //     return (
    //       <Flex gap="xs">
    //         <PhotoDeleteForm id={row.original.id} />
    //       </Flex>
    //     );
    //   },
    // },
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
            leftSection={<IconUpload size={16} />}
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
        isLoading={isFetching}
      />
    </Stack>
  );
}
