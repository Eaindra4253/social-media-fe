import {
  Box,
  Button,
  Card,
  FileButton,
  Flex,
  Image,
  Stack,
  Title,
  Modal,
  Select,
} from "@mantine/core";
import { useState } from "react";
import { useGetPhotos, useUploadPhoto } from "./queries";
import { DataTable } from "@/components/table/DataTable";
import { MRT_ColumnDef } from "mantine-react-table";
import { formatDateTimeZone } from "@/utils/date";
import { PhotoDeleteForm } from "./Form";

export function PhotoList() {
  const { data, isLoading } = useGetPhotos();
  const { mutate: uploadPhoto } = useUploadPhoto();
  const [files, setFiles] = useState<File[]>([]);
  const [opened, setOpened] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const openModal = () => {
    setOpened(true);
  };

  const columns: MRT_ColumnDef<Image>[] = [
    {
      accessorKey: "url",
      header: "Image",
      size: 100,
      Cell: ({ row }) => (
        <Image
          width="100px"
          height="auto"
          src={`${import.meta.env.VITE_API_URL}/${row.original.url}`}
          alt={row.original.filename}
          key={row.id}
        />
      ),
    },
    { accessorKey: "type", header: "Type", size: 100 },
    { accessorKey: "filename", header: "Filename", size: 100 },
    { accessorKey: "url", header: "URL", size: 100 },
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
      <Flex justify="space-between">
        <Title order={3}>Photo List</Title>
        <Button onClick={openModal}>Upload image</Button>
      </Flex>

      <Modal
        size="xl"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Upload Images"
      >
        <Stack>
          <Select
            label="Type"
            placeholder="Pick an image type"
            data={[
              { value: "CAROUSEL", label: "CAROUSEL" },
              { value: "BANNER", label: "BANNER" },
              { value: "LOGO", label: "LOGO" },
            ]}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />

          <FileButton
            onChange={handleFileChange}
            accept="image/png,image/jpeg,image/jpg"
            multiple
          >
            {(props) => <Button {...props}>Select images</Button>}
          </FileButton>

          {files.length > 0 && (
            <Flex gap={10} wrap="wrap" align="center" justify="space-between">
              {files.map((file) => (
                <Card key={file.name} shadow="md" withBorder p="xs">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={100}
                    height={100}
                    fit="cover"
                  />
                  <Box mt={5}>{file.name}</Box>
                </Card>
              ))}
            </Flex>
          )}

          <Button
            onClick={() => {
              console.log("upload", files, selectedCategory);
              const formData = new FormData();
              files.forEach((file) => formData.append("files", file));
              formData.append("type", selectedCategory as string);
              console.log("form data >>>>>>>>>>", formData);
              uploadPhoto(formData);
              setOpened(false);
            }}
          >
            Submit
          </Button>
        </Stack>
      </Modal>

      <Title order={3}>Uploaded Files</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <DataTable<Image>
          data={data ?? []}
          columns={columns}
          isLoading={isLoading}
          columnPinning={{
            right: ["_id"],
          }}
        />
      )}
    </Stack>
  );
}
