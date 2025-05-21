import { purchaseReportKeys } from "@/configs/queryKeys";
import { useParamsHelper } from "@/hooks/useParamHelper";
import {
  getPurchasedReports,
  getPurchasedReportsDownload,
} from "@/services/report.service";
import { useAuthStore } from "@/stores/auth.store";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";

export function usePurchaseReports() {
  const { getParam } = useParamsHelper();
  const user = useAuthStore((state) => state.user);

  const query = {
    outletType: user?.outletType
      ? user?.outletType
      : getParam("outletType") ?? undefined,
    page: getParam("page") ?? undefined,
    limit: getParam("limit") ?? 10,
    search: getParam("search") ?? undefined,
    fromDate: getParam("fromDate") ?? undefined,
    toDate: getParam("toDate") ?? undefined,
    status: getParam("status") ?? undefined,
  };

  return useQuery({
    queryKey: purchaseReportKeys.list(JSON.stringify(query)),
    queryFn: () => getPurchasedReports(query),
    select: (data) => data.data,
  });
}

export function usePurchaseDownloadReports() {
  const { searchParams } = useParamsHelper();

  const params = {
    ...Object.fromEntries([...searchParams]),
  };

  return useMutation({
    mutationFn: () => getPurchasedReportsDownload(params),
    onSuccess: (response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));

      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.download = "CCN Coupon Report.xlsx";
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
