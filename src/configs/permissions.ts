export const permissions: Record<
  "ADMIN" | "SUPER_ADMIN" | "SCANNER" | "FINANCE",
  string[]
> = {
  SCANNER: ["/qr-scanner"],
  ADMIN: ["/", "/gng-reports", "/coupons", "/photos", "card-coupon"],
  SUPER_ADMIN: [
    "/",
    "/gng-reports",
    "/coupons",
    "/photos",
    "/users",
    "/settings",
    "/card-coupon",
  ],
  FINANCE: ["/gng-reports"],
};

export const blockedMenusByOutletType = {
  GNG: [],
  PREMIER: ["gng-reports"],
  CAPITAL: [],
};
