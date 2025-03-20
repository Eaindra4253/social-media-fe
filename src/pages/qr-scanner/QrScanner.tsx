import { decrypt } from "@/utils/crypto";
import {
  Card,
  Center,
  Container,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAlertTriangle } from "@tabler/icons-react";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useScanQrCode } from "./quries";

export function QrScanner() {
  const { mutate, status } = useScanQrCode();

  const handleScan = (data: IDetectedBarcode[]) => {
    const scannedData = data[0].rawValue;

    const decrypted: DecryptedQrScan = decrypt(
      scannedData,
      import.meta.env.VITE_ENC_CODE
    );

    mutate({
      purchaseId: decrypted.purchaseId,
      apiKey: decrypted.apiKey,
    });
  };

  const handleError = () => {
    notifications.show({
      color: "red",
      title: "Error",
      icon: <IconAlertTriangle size={16} />,
      message: "Scanning Failed",
    });
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
        <Card
          shadow="lg"
          withBorder
          w={{ base: "100%", sm: "90%", md: "60%", lg: "40%" }}
        >
          {status === "pending" ? (
            <Center maw="100%" h={100}>
              <Loader color="blue" size="md" />
            </Center>
          ) : (
            <Scanner onScan={handleScan} onError={handleError} />
          )}
        </Card>
      </Stack>
    </Container>
  );
}
