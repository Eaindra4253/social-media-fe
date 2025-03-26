import { purchaseReportKeys } from "@/configs/queryKeys";
import { useParamsHelper } from "@/hooks/useParamHelper";
import {
  getPurchasedReports,
  getPurchasedReportsDownload,
} from "@/services/report.service";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";

export function usePurchaseReports() {
  const { getParam } = useParamsHelper();

  const query = {
    outletType: getParam("outletType") ?? undefined,
    page: getParam("page") ?? undefined,
    limit: getParam("limit") ?? 10,
    search: getParam("search") ?? undefined,
    date: getParam("date") ?? undefined,
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
