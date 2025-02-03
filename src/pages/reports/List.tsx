import { DateFilter } from "@/components/Filter";
import { DataTable } from "@/components/table/DataTable";
import { formatDate } from "@/utils/date";
import { Flex, Group, Stack, Title } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { DownloadReport } from "./DownloadReport";
import { useGngReports } from "./quries";

const columns: MRT_ColumnDef<GngReport>[] = [
  {
    accessorKey: "transDateTime",
    header: "Trans Date Time",
    size: 250,
    Cell: ({ row }) => {
      return row.original.transDateTime
        ? formatDate(row.original.transDateTime)
        : "-";
    },
  },
  {
    accessorKey: "information",
    header: "Transaction Id",
  },
  {
    accessorKey: "store",
    header: "Store",
  },
  {
    accessorKey: "staff",
    header: "Staff",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "receiptId",
    header: "Receipt Id",
  },
  {
    accessorKey: "terminal",
    header: "Terminal",
  },
];

export function ReportList() {
  const { data, isLoading } = useGngReports();

  return (
    <Stack>
      <Group justify="space-between" align="center">
        <Title order={3}>GNG Reports</Title>
        <Flex gap="sm">
          <DateFilter defaultValue={new Date()} />
          <DownloadReport />
        </Flex>
      </Group>
      <DataTable<GngReport>
        data={data ?? []}
        columns={columns}
        isLoading={isLoading}
      />
    </Stack>
  );
}
