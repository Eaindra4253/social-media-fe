import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { usePurchaseDownloadReports } from "./quries";

export function DownloadReport() {
  const { mutate } = usePurchaseDownloadReports();

  return (
    <Button
      onClick={() => mutate()}
      size="xs"
      leftSection={<IconDownload size={16} />}
    >
      Download Excel
    </Button>
  );
}
