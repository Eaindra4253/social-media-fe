import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useGngDownloadReports } from "./quries";

export function DownloadReport({ limit }: { limit: number }) {
  const { mutate } = useGngDownloadReports(limit);

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
