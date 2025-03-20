import { purchasedCoupon } from "@/services/qr.service";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export function useScanQrCode() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: { purchaseId: string }) => {
      const response = await purchasedCoupon({ purchaseId: data.purchaseId });
      return response.data;
    },
    onSuccess: (data) => {
      notifications.show({
        color: "green",
        title: "Success",
        icon: <IconCheck />,
        message: "QR Code Scanned Successfully",
      });

      navigate("/qr-scanner/success", { state: data });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const message = error?.response?.data?.message;

      notifications.show({
        color: "red",
        title: "Error",
        icon: <IconCheck />,
        message: message,
      });
    },
  });
}
