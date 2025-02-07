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
    accessorKey: "transactionId",
    header: "GNG Transaction Id",
  },
  {
    accessorKey: "information",
    header: "CCN Transaction Id",
    size: 300,
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
    header: "Coupon Amount",
  },
  {
    accessorKey: "totalAmount",
    header: "Pay Slip Amount",
  },
  {
    accessorKey: "receiptId",
    header: "PaySlip Id",
  },
  {
    accessorKey: "terminal",
    header: "Terminal",
  },
  {
    accessorKey: "couponUsedDate",
    header: "Used Date",
    size: 200,
    Cell: ({ row }) => {
      return row.original.couponUsedDate
        ? formatDate(row.original.couponUsedDate)
        : "-";
    },
  },
  {
    accessorKey: "couponCode",
    header: "Coupon Code",
    size: 100,
  },
  {
    accessorKey: "couponAmount",
    header: "CCN Coupon Amount",
    size: 100,
  },
  {
    accessorKey: "phoneNumber",
    header: "User Phone",
    size: 120,
    Cell: ({ row }) => {
      return row.original.phoneNumber?.replace("959", "09") ?? "-";
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
