import { decrypt } from "@/utils/crypto";
import {
  Button,
  Center,
  Container,
  Drawer,
  Grid,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { useScanQrCode } from "./quries";

export function QrScanner() {
  const { mutate, status } = useScanQrCode();
  const [opened, setOpened] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [decryptedData, setDecryptedData] = useState<DecryptedQrScan | null>(
    null
  );

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

        <Scanner
          key={opened ? "scanner-open" : "scanner-closed"}
          onScan={handleScan}
          styles={{
            container: {
              height: "400px",
              width: "400px",
            },
          }}
        />
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
