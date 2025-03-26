import {
  Box,
  Button,
  Card,
  FileButton,
  Flex,
  Image,
  Stack,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useGetPhotos } from "./queries";

export function PhotoList() {
  const { data, isLoading } = useGetPhotos();
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Stack>
      <Flex justify="space-between">
        <Title order={3}>Photo List</Title>
        <FileButton onChange={setFiles} accept="image/png,image/jpeg" multiple>
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
      </Flex>
      <Title order={3}>New Files</Title>
      <Flex gap={10}>
        {files.map((file) => (
          <Card key={file.name} shadow="md" withBorder p="xs">
            <Flex gap={10} align="center" justify="space-between">
              <Image src={URL.createObjectURL(file)} alt={file.name} />
            </Flex>
          </Card>
        ))}
      </Flex>
      <Title order={3}>Uploaded Files</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Stack>
          {data?.map((photo) => (
            <Card key={photo.id} shadow="md" withBorder p="xs">
              <Flex gap={10} align="center" justify="space-between">
                <img
                  width="100px"
                  height="auto"
                  src={`${import.meta.env.VITE_API_URL}/${photo.url}`}
                  alt={photo.filename}
                  key={photo.id}
                />
                <Box miw={200}>{photo.type}</Box>
                <Box miw={200}>{photo.filename}</Box>
                <Box miw={200}>{photo.url}</Box>
              </Flex>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
