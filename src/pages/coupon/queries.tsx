import { couponKeys } from "@/configs/queryKeys";
import { useParamsHelper } from "@/hooks/useParamHelper";
import { createCoupon, getCoupons, updateCoupon } from "@/services/coupon.service";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateCoupon() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateCouponRequest) => createCoupon(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: couponKeys.all });
      notifications.show({
        color: "green",
        title: "Success",
        icon: <IconCheck />,
        message: "Coupon Created Successfully",
      });
    },
    onError: () =>
      notifications.show({
        color: "red",
        title: "Error",
        icon: <IconCheck />,
        message: "Coupon Creation Failed",
      }),
  });
}

export function useGetCoupons() {
  const { getParam } = useParamsHelper();

  const params = {
    page: getParam("page") ?? 1,
    limit: getParam("limit") ?? 10,
  };

  return useQuery({
    queryKey: couponKeys.list(JSON.stringify(params)),
    queryFn: () => getCoupons(params),
    select: (data) => data.data,
  });
}

export function useUpdateCoupon(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => updateCoupon(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: couponKeys.all });
      notifications.show({
        color: "green",
        title: "Success",
        icon: <IconCheck />,
        message: "Coupon Updated Successfully",
      });
    },
    onError: () =>
      notifications.show({
        color: "red",
        title: "Error",
        icon: <IconCheck />,
        message: "Coupon Update Failed",
      }),
  });
}
