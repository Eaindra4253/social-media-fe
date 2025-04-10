import { DateFilter } from "@/components/Filter";
import { DataTable } from "@/components/table/DataTable";
import { useParamsHelper } from "@/hooks/useParamHelper";
import { formatDateTimeZone } from "@/utils/date";
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
        ? formatDateTimeZone(row.original.transDateTime)
        : "-";
    },
  },
  {
    accessorKey: "gngTransactionId",
    header: "GNG Transaction Id",
  },
  {
    accessorKey: "ccnTransactionId",
    header: "CCN Transaction Id",
    size: 300,
  },
  {
    accessorKey: "storeCode",
    header: "Store Code",
  },
  {
    accessorKey: "staffId",
    header: "Staff Id",
  },
  {
    accessorKey: "gngCouponAmount",
    header: "GNG Coupon Amount",
  },
  {
    accessorKey: "paySlipAmount",
    header: "Pay Slip Amount",
  },
  {
    accessorKey: "paySlipId",
    header: "PaySlip Id",
  },
  {
    accessorKey: "terminal",
    header: "Terminal",
  },
];

export function ReportList() {
  const { data, isLoading } = useGngReports();

  const { getParam } = useParamsHelper();

  const date = getParam("date") ?? new Date();

  return (
    <Stack>
      <Group justify="space-between" align="center">
        <Title order={3}>GNG COUPON Report</Title>
        <Flex gap="sm">
          <DateFilter defaultValue={new Date(date)} />
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
