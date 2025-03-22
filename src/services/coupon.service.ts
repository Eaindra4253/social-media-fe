import api from "@/configs/api";

export function createCoupon(data: CreateCouponRequest) {
  return api.post<ApiResponse<Coupon>>("/coupons", data);
}

export function getCoupons(params?: Record<string, unknown>) {
  return api.get<ApiResponseList<Coupon>>("/coupons", { params });
}

export function updateCoupon(id: number, data: Record<string, unknown>) {
  return api.put(`coupons/${id}`, data);
}
