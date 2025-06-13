import api from "@/configs/api";

export function getCardCouponReports(params?: Record<string, unknown>) {
  return api.get<ApiResponseList<CardCoupon>>("/card-coupon", {
    params,
  });
}

export function makePayment(data: Payment) {
  return api.post<ApiResponse<CardCoupon>>("/card-coupon/make-payment", data);
}

export function uploadExcel(data: FormData) {
  return api.post<CardCoupon>("/card-coupon", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function getPremierReportsDownload(params?: Record<string, unknown>) {
  return api.get("/card-coupon/download", {
    params,
    responseType: "blob",
  });
}
