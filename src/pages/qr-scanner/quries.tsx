import { purchasedCoupon } from "@/services/qr.service";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export function useScanQrCode() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: { purchaseId: string; apiKey: string }) =>
      purchasedCoupon({
        purchaseId: data.purchaseId,
        apiKey: data.apiKey,
      }),
    onSuccess: (response) => {
      notifications.show({
        color: "green",
        title: "Success",
        icon: <IconCheck />,
        message: "QR Code Scanned Successfully",
      });

      navigate("/qr-scanner/success", { state: response.data });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const message = error?.response?.data?.message;

      notifications.show({
        color: "red",
        title: "Error",
        icon: <IconCheck />,
        message: message,
      });

      navigate("/qr-scanner/error", { state: message });
    },
  });
}
