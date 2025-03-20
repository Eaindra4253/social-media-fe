export {};

declare global {
  type ApiResponse<T> = {
    data: T;
  };

  type ApiErrorResponse = {
    message: string;
  };

  type ApiResponseList<T> = {
    data: T[];
    totalCount: number;
    page: number;
    pageSize: number;
  };

  type LoginResponse = User & {
    accessToken: string;
  };

  type User = {
    id: string;
    username: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
    outletType: string;
    role: string;
  };

  type QrScanResponse = {
    transactionId: string;
    amount: number;
    couponName: string;
    couponType: string;
    outletType: string;
  };

  export interface PurchaseReport {
    id: number;
    userId: number;
    couponId: number;
    status: string;
    usedDate: string;
    paymentStatus: string;
    mobifinReferenceId: string;
    expiredAt: string;
    createdAt: string;
    updatedAt: string;
    transactions: Transactions;
    coupon: Coupon;
    user: User;
  }

  export interface Transactions {
    id: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    purchaseId: number;
  }

  export interface Coupon {
    id: number;
    code: string;
    name: string;
    thumbnail: string;
    imageUrl: string;
    couponType: string;
    outletType: string;
    description: string;
    couponAmount: number;
    pointAmount: number;
    createdAt: string;
    updatedAt: string;
    validDays: number;
  }

  export interface GngReport {
    transDateTime: string;
    gngTransactionId: string;
    ccnTransactionId: string;
    storeCode: string;
    staffId: string;
    gngCouponAmount: number;
    paySlipAmount: number;
    paySlipId: string;
    terminal: string;
    usedDate: string;
    couponCode: string;
    ccnCouponAmount: number;
    userPhone: string;
  }
}
