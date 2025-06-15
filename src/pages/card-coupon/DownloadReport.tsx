import { ActionIcon } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { usePremierDownloadReports } from "./quries";

export function DownloadReport() {
  const { mutate } = usePremierDownloadReports();

  return (
    <ActionIcon onClick={() => mutate()} size="xs" variant="transparent">
      <IconDownload size={16} />
    </ActionIcon>
  );
}
