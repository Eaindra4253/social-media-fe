import { DateFilter, StatusFilter } from "@/components/Filter";
import { DataTable } from "@/components/table/DataTable";
import { ERROR_COLOR, SUCCESS_COLOR, WARNING_COLOR } from "@/configs/constants";
import { formatDate } from "@/utils/date";
import { Flex, Group, Stack, Text, Title } from "@mantine/core";
import { IconCircleFilled } from "@tabler/icons-react";
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
    accessorKey: "coupon.description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 300,
    Cell: ({ row }) => {
      let c: string;

      switch (row.original.status) {
        case "PENDING":
          c = WARNING_COLOR;
          break;
        case "PURCHASED":
          c = ERROR_COLOR;
          break;
        default:
          c = SUCCESS_COLOR;
          break;
      }

      return (
        <Flex align="center" justify="flex-start" gap="xs">
          <IconCircleFilled size={10} color={c} />
          <Text fw="bold" fz="xs" c="gray" tt="capitalize">
            {row.original.status?.toLocaleLowerCase()}
          </Text>
        </Flex>
      );
    },
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
