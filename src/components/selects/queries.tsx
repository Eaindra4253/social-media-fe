import { photoKeys } from "@/configs/queryKeys";
import { getPhotos } from "@/services/photo.service";
import { useQuery } from "@tanstack/react-query";

export function useGetPhotos(type?: "LOGO" | "THUMBNAIL" | "IMAGE_URL") {
  const params = {
    type,
  };

  return useQuery({
    queryKey: photoKeys.list(JSON.stringify(params)),
    queryFn: () => getPhotos(params),
    select: (data) =>
      data.data.data.map((item) => ({ label: item.filename, value: item.url })),
  });
}
