import { useState, useEffect, useCallback } from "react";
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import { Scanner } from "@yudiel/react-qr-scanner";
import { Container, Stack, Box, Text, Title, Card } from "@mantine/core";
import { useScanQrCode } from './quries';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

const encryptionKey = 'CMP_TNX_CODE';

export function QrScanner() {
  const [qrResult, setQrResult] = useState<string>("");
  const [decryptedResult, setDecryptedResult] = useState<string>("");
  const { mutate, isError, isSuccess, status, data } = useScanQrCode();
  const matches = useMediaQuery('(max-width: 768px)');
  const matchesSm = useMediaQuery('(max-width: 576px)');
  const matchesLg = useMediaQuery('(min-width: 992px)');
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
    <Container size="100%" p="md" >
      <Title order={2} size="h2" ta='center' mb='10px'>
        Coupon Scan
      </Title>
      <Text c="dimmed" size="sm" ta='center' mb='20px'>
        Align the QR code within the frame to scan.
      </Text>
      <Stack align="center">
        <Card
          withBorder
          shadow="xl"
          radius="xl"
          p="lg"
          w={matchesSm ? "98%" : matches ? "90%" : matchesLg ? "40%" : "60%"}
          bd='1px solid #444'
          pos='relative'
        >
          {status === 'pending' ? (
            <Box
              pos='absolute'
              top="50%"
              left="50%"
            >
              <Text size="sm">Loading...</Text>
            </Box>
          ) : (
            <Scanner onScan={handleScan} onError={handleError} />
          )}
          <Box pos='absolute' top="50%" left="50%" w='60%' h='60%' />
        </Card>
        {decryptedResult && (
          <Box ta="center" style={{ marginTop: '20px' }}>
            <Text size="lg" w={500}>
              Decrypted Result:
            </Text>
            <Text size="md">{decryptedResult}</Text>
            {status === 'pending' && <Text size="sm">Loading...</Text>}
            {isError && <Text size="sm" c="red">Error occurred while processing.</Text>}
            {/* {isSuccess && <Text size="sm" c="green">Successfully processed!</Text>} */}
          </Box>
        )}
      </Stack>
    </Container>
  );
}