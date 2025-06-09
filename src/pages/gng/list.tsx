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
    Cell: ({ row }) => {
      return row.original.gngTransactionId ?? "-";
    },
  },
  {
    accessorKey: "ccnTransactionId",
    header: "CCN Transaction Id",
    size: 300,
    Cell: ({ row }) => {
      return row.original.ccnTransactionId ?? "-";
    },
  },
  {
    accessorKey: "storeCode",
    header: "Store Code",
    Cell: ({ row }) => {
      return row.original.storeCode ?? "-";
    },
  },
  {
    accessorKey: "staffId",
    header: "Staff Id",
    Cell: ({ row }) => {
      return row.original.staffId ?? "-";
    },
  },
  {
    accessorKey: "gngCouponAmount",
    header: "GNG Coupon Amount",
    Cell: ({ row }) => {
      return row.original.gngCouponAmount ?? "-";
    },
  },
  {
    accessorKey: "paySlipAmount",
    header: "Pay Slip Amount",
    Cell: ({ row }) => {
      return row.original.paySlipAmount ?? "-";
    },
  },
  {
    accessorKey: "paySlipId",
    header: "PaySlip Id",
    Cell: ({ row }) => {
      return row.original.paySlipId ?? "-";
    },
  },
  {
    accessorKey: "terminal",
    header: "Terminal",
    Cell: ({ row }) => {
      return row.original.terminal ?? "-";
    },
  },
  {
    accessorKey: "userPhoneNumber",
    header: "User Phone Number",
    Cell: ({ row }) => {
      return row.original.userPhoneNumber ?? "-";
    },
  },
  {
    accessorKey: "usedDate",
    header: "UsedDate",
    size: 200,
    Cell: ({ row }) => {
      return row.original.usedDate
        ? formatDateTimeZone(row.original.usedDate)
        : "-";
    },
  },
  {
    accessorKey: "couponCode",
    header: "Coupon Code",
    Cell: ({ row }) => {
      return row.original.couponCode ?? "-";
    },
  },
  {
    accessorKey: "ccnCouponAmount",
    header: "CCN Coupon Amount",
    Cell: ({ row }) => {
      return row.original.ccnCouponAmount ?? "-";
    },
  },
];

export function ReportList() {
  const { data, isLoading } = useGngReports();

  return (
    <Stack>
      <Group justify="space-between" align="center">
        <Title order={3}>GNG COUPON Report</Title>
        <Flex gap="sm">
          <DateRangeFilter />
          <DownloadReport />
        </Flex>
      </Group>
      <DataTable<GngReport>
        data={data?.data ?? []}
        columns={columns}
        isLoading={isLoading}          
        total={data?.totalCount ?? 0}
      />
    </Stack>
  );
}
