import { photoKeys } from "@/configs/queryKeys";
import { getPhotos } from "@/services/photo.service";
import { useQuery } from "@tanstack/react-query";

export function useGetPhotos() {
  return useQuery({
    queryKey: photoKeys.all,
    queryFn: () => getPhotos(),
    select: (data) => data.data,
  });
}
