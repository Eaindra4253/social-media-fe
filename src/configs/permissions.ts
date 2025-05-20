export const permissions: Record<
  "ADMIN" | "SUPER_ADMIN" | "SCANNER" | "FINANCE",
  string[]
> = {
  SCANNER: ["/qr-scanner"],
  ADMIN: ["/", "/gng-reports", "/coupons", "/photos"],
  SUPER_ADMIN: [
    "/",
    "/gng-reports",
    "/coupons",
    "/photos",
    "/users",
    "/settings",
  ],
  FINANCE: ["/gng-reports"],
};

export const blockedMenusByOutletType = {
  GNG: [],
  PREMIER: ["gng-reports"],
  CAPITAL: [],
};
