import api from "@/configs/api";
import { getCurrentDateReport } from "@/utils/date";

export function getPurchasedReports(params?: Record<string, unknown>) {
  return api.get<ApiResponseList<PurchaseReport>>("/report/coupon-reports", {
    params,
  });
}

export function getPurchasedReportsDownload(params?: Record<string, unknown>) {
  return api.get("/report/coupon-reports-download", {
    params,
    responseType: "blob",
  });
}

export function getGngReports(params?: Record<string, unknown>) {
  return api.get<GngReport[]>("/report/gng-reports", {
    params: {
      date: params?.date ?? getCurrentDateReport(),
    },
  });
}

export function getGngReportsDownload(params?: Record<string, unknown>) {
  return api.get("/report/gng-reports-download", {
    params: {
      date: params?.date ?? getCurrentDateReport(),
    },
    responseType: "blob",
  });
}
