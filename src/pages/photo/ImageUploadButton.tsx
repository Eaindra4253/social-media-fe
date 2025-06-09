import { OutletTypeFilter } from "@/components/Filter";
import { useAuthStore } from "@/stores/auth.store";
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
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconTrash, IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import { useUploadPhoto } from "./queries";

type FileUpload = {
  id: string;
  file: File;
};

export function ImageUploadButton() {
  const [files, setFiles] = useState<FileUpload[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [outletType, setOutletType] = useState<string | null>(null);
  const [fileButtonKey, setFileButtonKey] = useState(Math.random());
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: uploadPhoto, status } = useUploadPhoto();
  const user = useAuthStore((state) => state.user);
  const isLoading = status === "pending";

  const handleFileChange = (newFiles: File[]) => {
    const tempFiles = newFiles.map((file) => ({
      id: Math.random().toString(),
      file,
    }));

    setFiles((old) => [...old, ...tempFiles]);

    setFileButtonKey(Math.random());
  };

  const removeFile = (fileToRemove: FileUpload) => {
    setFiles((files) => files.filter((file) => file.id !== fileToRemove.id));
  };

  const handleUpload = () => {
    if (!selectedType) {
      notifications.show({
        title: "Error",
        message: "Please select a type",
        color: "red",
      });
      return;
    }

    if (files.length === 0) {
      notifications.show({
        title: "Error",
        message: "Please select an image",
        color: "red",
      });
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file.file));
    formData.append("type", selectedType as string);
    formData.append("outletType", user?.outletType ?? (outletType as string));
    uploadPhoto(formData, {
      onSettled: () => {
        setFiles([]);
        close();
      },
    });
  };

  return (
    <>
      {" "}
      <Button onClick={open} leftSection={<IconUpload size={16} />} size="xs">
        Upload Image
      </Button>
      <Modal size="xl" opened={opened} onClose={close} title="Upload Images">
        <Stack>
          <Select
            label="Image Type"
            placeholder="Pick an image type"
            data={[
              { value: "THUMBNAIL", label: "THUMBNAIL" },
              { value: "IMAGE_URL", label: "IMAGE_URL" },
              { value: "BANNER", label: "BANNER" },
              { value: "LOGO", label: "LOGO" },
            ]}
            value={selectedType}
            onChange={setSelectedType}
          />

          <OutletTypeFilter
            label="Outlet Type"
            placeholder="Choose a outlet type"
            value={outletType}
            onChange={setOutletType}
          />

          <FileButton
            key={fileButtonKey}
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
                    variant="light"
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
            onClick={handleUpload}
            loading={isLoading}
            disabled={isLoading}
          >
            Submit
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
