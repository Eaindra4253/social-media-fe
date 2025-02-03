import { DateFilter, StatusFilter } from "@/components/Filter";
import { DataTable } from "@/components/table/DataTable";
import { formatDate } from "@/utils/date";
import { Flex, Group, Stack, Title } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { DownloadReport } from "./DownloadReport";
import { usePurchaseReports } from "./quries";

const columns: MRT_ColumnDef<PurchaseReport>[] = [
  {
    accessorKey: "usedDate",
    header: "Used Date",
    size: 250,
    Cell: ({ row }) => {
      return row.original.usedDate ? formatDate(row.original.usedDate) : "-";
    },
  },
  {
    accessorKey: "coupon.code",
    header: "Coupon Code",
  },
  {
    accessorKey: "expiredAt",
    header: "Expired At",
    size: 250,
    Cell: ({ row }) => {
      return row.original.expiredAt ? formatDate(row.original.expiredAt) : "-";
    },
  },
  {
    accessorKey: "coupon.couponAmount",
    header: "Coupon Amount",
  },
  {
    accessorKey: "coupon.couponType",
    header: "Coupon Type",
  },
  {
    accessorKey: "coupon.outletType",
    header: "Outlet Type",
  },
  {
    accessorKey: "coupon.pointAmount",
    header: "Point Amount",
  },
  {
    accessorKey: "coupon.validDays",
    header: "Valid Days",
  },
  {
    accessorKey: "coupon.description",
    header: "Description",
  },
  {
    accessorKey: "transactionId",
    header: "Transaction Id",
    size: 300,
    Cell: ({ row }) => {
      return row.original.transactions?.id ?? "-";
    },
  },
];

export function TransactionList() {
  const { data, isLoading } = usePurchaseReports();

  return (
    <Stack>
      <Group justify="space-between" align="center">
        <Title order={3}>Transactions Report</Title>
        <Flex gap="sm">
          <DateFilter />
          <StatusFilter />
          <DownloadReport />
        </Flex>
      </Group>
      <DataTable<PurchaseReport>
        data={data?.data ?? []}
        columns={columns}
        isLoading={isLoading}
        total={data?.totalCount}
      />
    </Stack>
  );
}
