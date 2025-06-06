import { Button, Modal, Stack, FileButton, Box, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

interface ExcelUploadButtonProps {
  opened: boolean;
  onClose: () => void;
  uploadExcel: (formData: FormData) => void;
}

export function ExcelUploadButton({
  opened,
  onClose,
  uploadExcel,
}: ExcelUploadButtonProps) {
  const [file, setFile] = useState<File | null>(null);

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
    uploadExcel(formData);
    setFile(null);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Upload Excel File"
      size="md"
    >
      <Stack>
        <FileButton onChange={(file) => setFile(file)} accept=".xlsx,.xls">
          {(props) => <Button {...props}>Select Excel File</Button>}
        </FileButton>

        {file && (
          <Box>
            <Text size="sm">{file.name}</Text>
          </Box>
        )}

        <Button onClick={handleUpload}>Submit</Button>
      </Stack>
    </Modal>
  );
}
