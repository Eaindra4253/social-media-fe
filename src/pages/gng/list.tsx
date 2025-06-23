import { AuthorizedPage } from "@/components/Can";
import { DateRangeFilter } from "@/components/Filter";
import { DataTable } from "@/components/table/DataTable";
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
    size: 250,
    Cell: ({ row }) => {
      return row.original.gngTransactionId ?? "-";
    },
  },
  {
    accessorKey: "storeCode",
    header: "Store Code",
    size: 200,
    Cell: ({ row }) => {
      return row.original.storeCode ?? "-";
    },
  },
  {
    accessorKey: "staffId",
    header: "Staff Id",
    size: 200,
    Cell: ({ row }) => {
      return row.original.staffId ?? "-";
    },
  },
  {
    accessorKey: "coupons",
    header: "Coupons",
    size: 300,
    Cell: ({ row }) => {
      return row.original.coupons ?? "-";
    },
  },
  {
    accessorKey: "couponTotalAmount",
    header: "Coupon Total Amount",
    size: 300,
    Cell: ({ row }) => {
      return row.original.couponTotalAmount ?? "-";
    },
  },
  {
    accessorKey: "paySlipAmount",
    header: "PaySlip Amount",
    size: 300,
    Cell: ({ row }) => {
      return row.original.paySlipAmount ?? "-";
    },
  },
  {
    accessorKey: "changeAmount",
    header: "Change Amount",
    size: 300,
    Cell: ({ row }) => {
      return row.original.changeAmount ?? "-";
    },
  },
  {
    accessorKey: "paySlipId",
    header: "PaySlip Id",
    size: 200,
    Cell: ({ row }) => {
      return row.original.paySlipId ?? "-";
    },
  },
  {
    accessorKey: "terminal",
    header: "Terminal",
    size: 200,
    Cell: ({ row }) => {
      return row.original.terminal ?? "-";
    },
  },
];

export function ReportList() {
  const { data, isLoading } = useGngReports();

  return (
    <AuthorizedPage permission="AX_TRANSACTION_LIST">
      <Stack>
        <Group justify="space-between" align="center">
          <Title order={3}>GNG COUPON Report</Title>
          <Flex gap="sm">
            <DateRangeFilter />
            <DownloadReport limit={data?.totalCount ?? 0} />
          </Flex>
        </Group>
        <DataTable<GngReport>
          data={data?.data ?? []}
          columns={columns}
          isLoading={isLoading}
          total={data?.totalCount ?? 0}
        />
      </Stack>
    </AuthorizedPage>
  );
}
