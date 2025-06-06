export const user = {
  all: ["user"] as const,
  lists: () => [...user.all, "list"] as const,
  list: (filters: string) => [...user.lists(), { filters }] as const,
  details: () => [...user.all, "detail"] as const,
  detail: (id: number) => [...user.details(), id] as const,
};

export const purchaseReportKeys = {
  all: ["purchaseReportKeys"] as const,
  lists: () => [...purchaseReportKeys.all, "list"] as const,
  list: (filters: string) =>
    [...purchaseReportKeys.lists(), { filters }] as const,
  details: () => [...purchaseReportKeys.all, "detail"] as const,
  detail: (id: number) => [...purchaseReportKeys.details(), id] as const,
};

export const gngReportKeys = {
  all: ["gngReportKeys"] as const,
  lists: () => [...gngReportKeys.all, "list"] as const,
  list: (filters: string) => [...gngReportKeys.lists(), { filters }] as const,
  details: () => [...gngReportKeys.all, "detail"] as const,
  detail: (id: number) => [...gngReportKeys.details(), id] as const,
};

export const couponKeys = {
  all: ["couponKeys"] as const,
  lists: () => [...couponKeys.all, "list"] as const,
  list: (filters: string) => [...couponKeys.lists(), { filters }] as const,
  details: () => [...couponKeys.all, "detail"] as const,
  detail: (id: number) => [...couponKeys.details(), id] as const,
};

export const photoKeys = {
  all: ["photoKeys"] as const,
  lists: () => [...photoKeys.all, "list"] as const,
  list: (filters: string) => [...photoKeys.lists(), { filters }] as const,
  details: () => [...photoKeys.all, "detail"] as const,
  detail: (id: number) => [...photoKeys.details(), id] as const,
};

export const userKeys = {
  all: ["user"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

export const settingKeys = {
  all: ["settings"] as const,
  lists: () => [...settingKeys.all, "list"] as const,
  list: (filters: string) => [...settingKeys.lists(), { filters }] as const,
  details: () => [...settingKeys.all, "detail"] as const,
  detail: (id: number) => [...settingKeys.details(), id] as const,
};

export const cardCouponKeys = {
  all: ["cardCouponKeys"] as const,
  lists: () => [...cardCouponKeys.all, "list"] as const,
  list: (filters: string) => [...cardCouponKeys.lists(), { filters }] as const,
  details: () => [...cardCouponKeys.all, "detail"] as const,
  detail: (id: number) => [...cardCouponKeys.details(), id] as const,
};

export const dashboardKeys = {
  all: ["dashboardKeys"] as const,
  lists: () => [...dashboardKeys.all, "list"] as const,
  list: (filters: string) => [...dashboardKeys.lists(), { filters }] as const,
  details: () => [...dashboardKeys.all, "detail"] as const,
  detail: (id: number) => [...dashboardKeys.details(), id] as const,
};
