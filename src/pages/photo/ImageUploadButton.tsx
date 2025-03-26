import {
  ActionIcon,
  Box,
  Button,
  Card,
  FileButton,
  Flex,
  Image,
  Modal,
  Select,
  Stack,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";

interface ImageUploadButtonProps {
  opened: boolean;
  onClose: () => void;
  uploadPhoto: (formData: FormData) => void;
}

type FileUpload = {
  id: string;
  file: File;
};

export function ImageUploadButton({
  opened,
  onClose,
  uploadPhoto,
}: ImageUploadButtonProps) {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleFileChange = (newFiles: File[]) => {
    const tempFiles = newFiles.map((file) => ({
      id: Math.random().toString(),
      file,
    }));

    setFiles((old) => [...old, ...tempFiles]);
  };

  const removeFile = (fileToRemove: FileUpload) => {
    setFiles(files.filter((file) => file.id !== fileToRemove.id));
  };

  return (
    <Modal size="xl" opened={opened} onClose={onClose} title="Upload Images">
      <Stack>
        <Select
          label="Type"
          placeholder="Pick an image type"
          data={[
            { value: "THUMBNAIL", label: "THUMBNAIL" },
            { value: "IMAGE_URL", label: "IMAGE_URL" },
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
          <Flex gap="sm" direction="row" wrap="wrap">
            {files.map((file) => (
              <Card key={file.id} shadow="md" withBorder p="xs">
                <ActionIcon
                  variant="filled"
                  color="red"
                  size="sm"
                  radius="sm"
                  style={{ position: "absolute", bottom: 6, right: 5 }}
                  onClick={() => removeFile(file)}
                >
                  <IconTrash size="1rem" />
                </ActionIcon>
                <Image
                  src={URL.createObjectURL(file.file)}
                  alt={file.file.name}
                  width="100%"
                  height={100}
                  fit="cover"
                />
                <Box mt={5}>{file.file.name}</Box>
              </Card>
            ))}
          </Flex>
        )}

        <Button
          onClick={() => {
            const formData = new FormData();
            files.forEach((file) => formData.append("files", file.file));
            formData.append("type", selectedCategory as string);
            uploadPhoto(formData);
            onClose();
          }}
        >
          Submit
        </Button>
      </Stack>
    </Modal>
  );
}
