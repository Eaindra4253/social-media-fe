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
