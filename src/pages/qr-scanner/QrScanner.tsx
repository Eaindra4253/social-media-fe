import { useState, useEffect, useCallback } from "react";
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import { Scanner } from "@yudiel/react-qr-scanner";
import { Container, Stack, Box, Text, Title, Card } from "@mantine/core";
import { useScanQrCode } from './quries';
import { useNavigate } from 'react-router-dom';

const encryptionKey = 'CMP_TNX_CODE';

export function QrScanner() {
  const [qrResult, setQrResult] = useState<string>("");
  const [decryptedResult, setDecryptedResult] = useState<string>("");
  const { mutate, isError, isSuccess, status, data } = useScanQrCode();
  const navigate = useNavigate();

  const decryptData = useCallback((encryptedData: string): string => {
    try {
      const bytes = AES.decrypt(encryptedData, encryptionKey);
      const decrypted = bytes.toString(Utf8);
      return decrypted || "Decryption failed";
    } catch (error) {
      console.error("Decryption Error:", error);
      return "Decryption error";
    }
  }, []);

  useEffect(() => {
    if (decryptedResult && decryptedResult !== "Decryption failed" && decryptedResult !== "Decryption error") {
      mutate({ purchaseId: decryptedResult });
    }
  }, [decryptedResult, mutate]);

  useEffect(() => {
    if (isSuccess && data) {
      navigate('/success', { state: data });
    }
  }, [isSuccess, data, navigate]);

  const handleScan = useCallback((data: { rawValue: string }[] | null): void => {
    if (data && data.length > 0) {
      const rawValue = data[0].rawValue;
      setQrResult(rawValue);
      const decrypted = decryptData(rawValue);
      setDecryptedResult(decrypted);
      console.log("Decrypted Data:", decrypted);
    }
  }, [decryptData]);

  const handleError = useCallback((err: unknown) => {
    console.error("Scan Error:", err);
  }, []);

  return (
    <Container size="100%" p="md">
      <Title order={2} size="h2" ta="center" mb="sm">
        Coupon Scan
      </Title>
      <Text c="dimmed" size="sm" ta="center" mb="lg">
        Align the QR code within the frame to scan.
      </Text>
      <Stack align="center" justify="center" gap="lg">
        <Card withBorder shadow="xl" radius="xl" p="lg" w={{ base: '100%', sm: '90%', md: '60%', lg: '40%' }}>
          {status === 'pending' ? (
            <Box display="flex" ta="center" h="100%">
              <Text size="sm">Loading...</Text>
            </Box>
          ) : (
            <Scanner onScan={handleScan} onError={handleError} />
          )}
        </Card>
      </Stack>
    </Container>
  );
}
