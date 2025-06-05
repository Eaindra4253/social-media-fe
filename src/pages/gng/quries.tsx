import { gngReportKeys } from "@/configs/queryKeys";
import { useParamsHelper } from "@/hooks/useParamHelper";
import {
  getGngReports,
  getGngReportsDownload,
} from "@/services/report.service";
import { formatDateTimeZone } from "@/utils/date";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGngReports() {
  const { getParam } = useParamsHelper();

  const query = {
    page: getParam("page") ?? undefined,
    limit: getParam("limit") ?? 10,
    search: getParam("search") ?? undefined,
    date: getParam("date") ?? undefined,
  };

  return useQuery({
    queryKey: gngReportKeys.list(JSON.stringify(query)),
    queryFn: () => getGngReports(query),
    select: (data) => data.data,
  });
}

export function useGngDownloadReports() {
  const { searchParams } = useParamsHelper();

  const formatted = formatDateTimeZone(new Date());

  const params = {
    ...Object.fromEntries([...searchParams]),
  };

  return useMutation({
    mutationFn: () => getGngReportsDownload(params),
    onSuccess: (response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));

      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.download = `GNG Coupon Report - ${formatted}.xlsx`;
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
