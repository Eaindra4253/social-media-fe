import { settingKeys } from "@/configs/queryKeys";
import { getSetting, updateSetting } from "@/services/settings.service";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetSettings() {
  return useQuery({
    queryKey: settingKeys.lists(),
    queryFn: () => getSetting(),
    select: (data) => data.data,
  });
}

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingKeys.lists() });
      notifications.show({
        color: "green",
        title: "Success",
        icon: <IconCheck />,
        message: "Settings Updated Successfully",
      });
    },
  });
}
