import { decrypt } from "@/utils/crypto";
import {
  Center,
  Container,
  Loader,
  Stack,
  Text,
  Title,
  Button,
  Group,
  Drawer,
  Grid,
} from "@mantine/core";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useScanQrCode } from "./quries";
import { useState, useEffect } from "react";

export function QrScanner() {
  const { mutate, status } = useScanQrCode();
  const [opened, setOpened] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [decryptedData, setDecryptedData] = useState<DecryptedQrScan | null>(
    null
  );
  const [cameraError, setCameraError] = useState(false);

  useEffect(() => {
    if (cameraError) {
      setScannedData(null);
    }
  }, [cameraError]);

  const handleScan = (data: IDetectedBarcode[]) => {
    const scannedValue = data[0].rawValue;
    setScannedData(scannedValue);

    const decrypted: DecryptedQrScan = decrypt(
      scannedValue,
      import.meta.env.VITE_ENC_CODE
    );

    setDecryptedData(decrypted);

    const { purchaseId, apiKey } = decrypted;

    if (purchaseId && apiKey) {
      setOpened(true);
    }
  };

  const handleConfirm = () => {
    if (scannedData) {
      const decrypted: DecryptedQrScan = decrypt(
        scannedData,
        import.meta.env.VITE_ENC_CODE
      );

      const { purchaseId, apiKey } = decrypted;
      mutate({
        purchaseId: purchaseId,
        apiKey: apiKey,
      });
    }
    setOpened(false);
  };

  const handleCancel = () => {
    setOpened(false);
  };

  return (
    <Container size="100%" p="md">
      <Title order={2} size="h2" ta="center" mb="sm">
        Coupon Scan
      </Title>
      <Text c="dimmed" size="sm" ta="center" mb="lg">
        Align the QR code within the frame to scan.
      </Text>
      <Stack align="center" justify="center" gap="lg">
        {status === "pending" ? (
          <Center maw="100%" h={100}>
            <Loader color="blue" size="md" />
          </Center>
        ) : null}
        {cameraError ? (
          <Stack align="center" justify="center" gap="sm">
            <Text c="red" size="sm" ta="center">
              Camera access is not allowed or permission is denied.
            </Text>
            <Text c="red" size="sm" ta="center">
              Please check your camera settings and try again.
            </Text>
          </Stack>
        ) : (
          <Scanner
            key={opened ? "scanner-open" : "scanner-closed"}
            onScan={handleScan}
            onError={() => {
              setCameraError(true);
            }}
            styles={{
              container: {
                width: "100%",
                height: "100%",
                maxHeight: "400px",
                maxWidth: "400px",
              },
            }}
          />
        )}
      </Stack>
      <Drawer
        opened={opened}
        onClose={handleCancel}
        title="Are you sure want to submit?"
        position="bottom"
        size="xs"
        closeButtonProps={{ style: { display: "none" } }}
      >
        {scannedData && decryptedData ? (
          <Stack>
            <Grid gutter="sm">
              <Grid.Col span={12}>
                <Group justify="space-between">
                  <Text size="sm">Total Used:</Text>
                  <Text size="sm">
                    {decryptedData.totalUsed ? decryptedData.totalUsed : "-"}
                  </Text>
                </Group>
              </Grid.Col>
            </Grid>

            <Grid gutter="sm">
              <Grid.Col span={12}>
                <Group justify="space-between">
                  <Text size="sm">Name:</Text>
                  <Text size="sm">
                    {decryptedData.name ? decryptedData.name : "-"}
                  </Text>
                </Group>
              </Grid.Col>
            </Grid>

            <Grid gutter="sm">
              <Grid.Col span={12}>
                <Group justify="space-between">
                  <Text size="sm">Outlet Type:</Text>
                  <Text size="sm">
                    {decryptedData.outletType ? decryptedData.outletType : "-"}
                  </Text>
                </Group>
              </Grid.Col>
            </Grid>

            <Grid gutter="sm">
              <Grid.Col span={12}>
                <Group justify="space-between">
                  <Text size="sm">Amount:</Text>
                  <Text size="sm">
                    {decryptedData.amount ? decryptedData.amount : "-"} kyats
                  </Text>
                </Group>
              </Grid.Col>
            </Grid>

            <Group justify="center" mt={60}>
              <Button variant="outline" color="gray" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleConfirm}>Confirm</Button>
            </Group>
          </Stack>
        ) : null}
      </Drawer>
    </Container>
  );
}
