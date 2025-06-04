import api from "@/configs/api";

export function getCardCouponReports(params?: Record<string, unknown>) {
  return api.get<ApiResponseList<CardCoupon>>("/card-coupon", {
    params,
  });
}

export function makePayment(data: Payment) {
  return api.post<ApiResponse<CardCoupon>>("/card-coupon/make-payment", data);
}
