export const permissions: Record<
  "ADMIN" | "SUPER_ADMIN" | "SCANNER",
  string[]
> = {
  SCANNER: [],
  ADMIN: ["/", "/gng-reports", "/coupons", "/photos"],
  SUPER_ADMIN: [
    "/",
    "/gng-reports",
    "/coupons",
    "/photos",
    "/users",
    "/settings",
  ],
};

export const blockedMenusByOutletType = {
  GNG: [],
  PREMIER: ["gng-reports"],
  CAPITAL: [],
};
