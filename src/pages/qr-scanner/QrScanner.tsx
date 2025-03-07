import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Container, Stack, Box, Text, Title, Card } from "@mantine/core";

export function QrScanner() {
  const [qrResult, setQrResult] = useState<string>("");

  type QrCodeResult = { rawValue: string };

  const handleScan = (data: QrCodeResult[] | null): void => {
    if (data && data.length > 0) {
      setQrResult(data[0].rawValue);
      console.log("Scanned Data:", data[0].rawValue);
    }
  };

  const handleError = (err: Error) => {
    console.error("Scan Error:", err);
  };

  return (
    <Container size="100%" h="100vh" p="md">
      <Stack justify="center" align="center" h="100vh" gap="xl">
        <Box w="100%" ta="start">
          <Title order={2} size="h2">
            Scan QR Code
          </Title>
          <Text c="dimmed" size="h2">
            Align the QR code within the frame to scan.
          </Text>
        </Box>
        <Card
          withBorder
          shadow="xl"
          radius="xl"
          p="lg"
          w="60%"
          mih={{ base: "250px", sm: "300px", md: "350px" }}
        >
          <Scanner onScan={handleScan} onError={handleError} />
        </Card>
        {qrResult && (
          <Box ta="center">
            <Text size="lg" w={500}>
              Scanned Result:
            </Text>
            <Text size="md">{qrResult}</Text>
          </Box>
        )}
      </Stack>
    </Container>
  );
}
