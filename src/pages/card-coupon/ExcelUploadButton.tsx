import { Button, Modal, Stack, FileButton, Box, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useUploadExcel } from "./quries";
import { IconUpload } from "@tabler/icons-react";

export function ExcelUploadButton() {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: uploadExcel, status } = useUploadExcel();
  const [file, setFile] = useState<File | null>(null);
  const isLoading = status === "pending";

  const handleUpload = () => {
    if (!file) {
      notifications.show({
        title: "Error",
        message: "Please select an Excel file",
        color: "red",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    uploadExcel(formData, {
      onSettled: () => {
        setFile(null);
        close();
      },
    });
  };

  return (
    <>
      <Button
        onClick={open}
        leftSection={<IconUpload size={16} />}
        size="xs"
      >
        Upload Excel
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title="Upload Excel File"
        size="md"
      >
        <Stack>
          <FileButton onChange={setFile} accept=".xlsx,.xls">
            {(props) => <Button {...props}>Select Excel File</Button>}
          </FileButton>

          {file && (
            <Box>
              <Text size="sm">{file.name}</Text>
            </Box>
          )}

          <Button onClick={handleUpload} loading={isLoading} disabled={isLoading}>Submit</Button>
        </Stack>
      </Modal>
    </>
  );
}