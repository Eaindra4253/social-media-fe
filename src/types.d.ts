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
    id: number;
    username: string;
    fullName: string;
    uniqueId: string;
    retryCount: number;
    lastBlockedDatetime: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: "ADMIN" | "SCANNER" | "SUPER_ADMIN" | "FINANCE";
    outletType: "GNG" | "CAPITAL" | "PREMIER";
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
  };

  type QrScanResponse = {
    transactionId: string;
    amount: number;
    couponName: string;
    couponType: string;
    outletType: string;
  };

  type DecryptedQrScan = {
    name: string;
    purchaseId: string;
    amount: number;
    outletType: string;
    apiKey: string;
    totalUsed: number;
  };

  interface PurchaseReport {
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

  interface Transactions {
    id: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    axTransactionId?: string;
    staffId?: string;
    storeId?: string;
    receiptNo?: string;
    receiptAmount?: number;
    couponAmount?: number;
    purchaseId: number;
  }

  interface Coupon {
    id: number;
    code: string;
    name: string;
    thumbnail: string;
    imageUrl: string;
    category: string;
    logo: string;
    couponType: string;
    outletType: string;
    description: string;
    remark: string;
    amount: number;
    createdAt: string;
    updatedAt: string;
    validDays: number;
    isActive: boolean;
    productId: string;
    purchases: [];
  }

  interface GngReport {
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
    userPhoneNumber: string;
  }

  interface CreateCouponRequest {
    code: string;
    name: string;
    description: string;
    amount: number;
    thumbnail: string;
    remark: string;
    imageUrl: string;
    logo: string;
    category: string;
    couponType: string;
    outletType?: string;
    validDays: number;
    productId: string;
  }

  interface Image {
    id: number;
    url: string;
    filename: string;
    type: string;
    outletType: string;
    createdAt: string;
    updatedAt: string;
  }

  interface Settings {
    id: number;
    enableWhiteList: boolean;
    whiteList: string;
  }

  interface CardCoupon {
    id: number;
    serialNo: string;
    coupon: string;
    optimizer: string;
    priceCode: string;
    price: number;
    batchCode: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    CardCouponTransaction: CardCouponTransaction;
  }

  interface CardCouponTransaction {
    id: string;
    cardCouponId: string;
    claimById: number;
    referenceId: number;
    createdAt: string;
    updatedAt: string;
    paymentDate: string;
    paymentStatus: string;
    remark: string;
    claimBy: User;
  }

  interface Payment {
    remark: string;
    transactionId: string;
  }

  type DashboardData = {
    active: number;
    activeCount: number;
    used: number;
    usedCount: number;
    expired: number;
    expiredCount: number;
    count: number;
  };
}
