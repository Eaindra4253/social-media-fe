import { cardCouponKeys } from "@/configs/queryKeys";
import { useParamsHelper } from "@/hooks/useParamHelper";
import { getCardCouponReports, makePayment } from "@/services/card-coupon.service";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCardCouponReports() {
  const { getParam } = useParamsHelper();

  const query = {
    page: getParam("page") ?? 1,
    limit: getParam("limit") ?? 10,
    search: getParam("search") ?? undefined,
    status: getParam("status") ?? undefined,
    paymentStatus: getParam("paymentStatus") ?? undefined
  };

  return useQuery({
    queryKey: cardCouponKeys.list(JSON.stringify(query)),
    queryFn: () => getCardCouponReports(query),
    select: (data) => data.data,
  });
}

export function useMakePayment(transactionId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Payment) => makePayment({ ...data, transactionId } as Payment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cardCouponKeys.all });
      notifications.show({
        color: "green",
        title: "Success",
        icon: <IconCheck />,
        message: "Make Payment Successfully",
      });
    },
    onError: () =>
      notifications.show({
        color: "red",
        title: "Error",
        icon: <IconCheck />,
        message: "Make Payment Failed",
      }),
  });
}