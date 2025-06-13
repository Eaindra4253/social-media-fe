import { Button } from "@mantine/core";
import { usePremierDownloadReports } from "./quries";
import { IconDownload } from "@tabler/icons-react";

export function DownloadReport() {
  const { mutate } = usePremierDownloadReports();

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