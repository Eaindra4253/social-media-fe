import { ActionIcon } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { usePurchaseDownloadReports } from "./quries";

export function DownloadReport() {
  const { mutate } = usePurchaseDownloadReports();

  return (
    <ActionIcon
      onClick={() => mutate()}
      variant="transparent"
      title="Download Report"
    >
      <IconDownload size={16} />
    </ActionIcon>
  );
}
