import { dashboardKeys } from "@/configs/queryKeys";
import { useParamsHelper } from "@/hooks/useParamHelper";
import { getDashboardReports } from "@/services/report.service";
import { useAuthStore } from "@/stores/auth.store";
import { useQuery } from "@tanstack/react-query";

export function useDashboardReports() {
  const { getParam } = useParamsHelper();

  const user = useAuthStore((state) => state.user);

  const query = {
    fromDate: getParam("fromDate") ?? undefined,
    toDate: getParam("toDate") ?? undefined,
    outletType: user?.outletType
      ? user?.outletType
      : getParam("outletType") ?? undefined,
  };

  return useQuery({
    queryKey: dashboardKeys.list(JSON.stringify(query)),
    queryFn: () => getDashboardReports(query),
    select: (data) => data.data,
  });
}
