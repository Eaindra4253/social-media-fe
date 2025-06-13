import { cardCouponKeys } from "@/configs/queryKeys";
import { useParamsHelper } from "@/hooks/useParamHelper";
import { getCardCouponReports, getPremierReportsDownload, makePayment, uploadExcel } from "@/services/card-coupon.service";
import { formatDateTimeZone } from "@/utils/date";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCardCouponReports() {
  const { getParam } = useParamsHelper();

  const query = {
    page: getParam("page") ?? 1,
    limit: getParam("limit") ?? 10,
    search: getParam("search") ?? undefined,
    status: getParam("status") ?? undefined,
    paymentStatus: getParam("paymentStatus") ?? undefined
  };

  return useQuery({
    queryKey: cardCouponKeys.list(JSON.stringify(query)),
    queryFn: () => getCardCouponReports(query),
    select: (data) => data.data,
  });
}

export function useMakePayment(transactionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Payment) => makePayment({ ...data, transactionId } as Payment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cardCouponKeys.all });
      notifications.show({
        color: "green",
        title: "Success",
        icon: <IconCheck />,
        message: "Make Payment Successfully",
      });
    },
    onError: () =>
      notifications.show({
        color: "red",
        title: "Error",
        icon: <IconCheck />,
        message: "Make Payment Failed",
      }),
  });
}

export function useUploadExcel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => uploadExcel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cardCouponKeys.all });
      notifications.show({
        title: "Success",
        message: "Excel file uploaded successfully",
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to upload Excel file",
        color: "red",
      });
    },
  });
}

export function usePremierDownloadReports() {
  const { searchParams } = useParamsHelper();

  const formatted = formatDateTimeZone(new Date());

  const params = {
    ...Object.fromEntries([...searchParams]),
  };

  return useMutation({
    mutationFn: () => getPremierReportsDownload(params),
    onSuccess: (response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));

      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.download = `Premier Monsoon Campaign Report - ${formatted}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Cannot download report",
        color: "red",
      });
    },
  });
}
