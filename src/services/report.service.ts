import api from "@/configs/api";
import { getCurrentDateReport } from "@/utils/date";

export function getPurchasedReports(params?: Record<string, unknown>) {
  return api.get<ApiResponseList<PurchaseReport>>("/admin/coupon-reports", {
    params,
  });
}

export function getPurchasedReportsDownload(params?: Record<string, unknown>) {
  return api.get("/admin/coupon-reports-download", {
    params,
    responseType: "blob",
  });
}

export function getGngReports(params?: Record<string, unknown>) {
  return api.get<ApiResponseList<GngReport>>("/admin/gng-reports", {
    params: {
      date: params?.date ?? getCurrentDateReport(),
    },
  });
}

export function getGngReportsDownload(params?: Record<string, unknown>) {
  return api.get("/admin/gng-reports-download", {
    params: {
      date: params?.date ?? getCurrentDateReport(),
    },
    responseType: "blob",
  });
}

export function getDashboardReports(params?: Record<string, unknown>) {
  return api.get<DashboardData>("/admin/dashboard-report", {
    params,
  });
}
