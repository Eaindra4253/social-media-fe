import { queryKeys } from "@/configs/queryKeys";
import { purchasedCoupon } from "@/services/qr.service";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useQueryClient, useMutation } from '@tanstack/react-query';

export function useScanQrCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { purchaseId: string }) => {
      const response = await purchasedCoupon({ purchaseId: data.purchaseId });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      notifications.show({
        color: "green",
        title: "Success",
        icon: <IconCheck />,
        message: "QR Code Scanned Successfully",
      });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || (error as Error)?.message || "QR Code Scan Failed";
      notifications.show({
        color: "red",
        title: "Error",
        icon: <IconCheck />,
        message: message,
      });
    },
  });
}
