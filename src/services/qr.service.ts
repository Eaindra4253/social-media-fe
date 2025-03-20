import api from "@/configs/api";

export function purchasedCoupon(data: { purchaseId: string; apiKey: string }) {
  return api.post<ApiResponse<QrScanResponse>>("/admin/usePurchasedCoupon", data);
}

export function getPurchaseDetails() {
  return api.get<ApiResponseList<PurchaseReport>>("/purchases");
}
