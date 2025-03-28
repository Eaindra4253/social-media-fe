import { DateFilter, StatusFilter } from "@/components/Filter";
import { DataTable } from "@/components/table/DataTable";
import {
  ERROR_COLOR,
  PURCHASED_COLOR,
  SUCCESS_COLOR,
} from "@/configs/constants";
import { formatDateTimeZone } from "@/utils/date";
import { Flex, Group, Stack, Text, Title } from "@mantine/core";
import { IconCircleFilled } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { DownloadReport } from "./DownloadReport";
import { usePurchaseReports } from "./quries";

const columns: MRT_ColumnDef<PurchaseReport>[] = [
  {
    accessorKey: "createdAt",
    header: "Purchase Date",
    size: 200,
    Cell: ({ row }) => {
      return row.original.createdAt
        ? formatDateTimeZone(row.original.createdAt)
        : "-";
    },
  },
  {
    accessorKey: "coupon.amount",
    header: "Coupon Amount",
    size: 100,
  },
  {
    accessorKey: "coupon.category",
    header: "Coupon Category",
    size: 100,
  },
  {
    accessorKey: "coupon.couponType",
    header: "Coupon Type",
    size: 100,
  },
  {
    accessorKey: "coupon.outletType",
    header: "Outlet Type",
    size: 100,
  },
  {
    accessorKey: "user.phoneNumber",
    header: "User Phone Number",
    size: 120,
    Cell: ({ row }) => {
      return row.original.user?.phoneNumber?.replace("959", "09") ?? "-";
    },
  },
  {
    accessorKey: "mobifinReferenceId",
    header: "Mobifin Reference Id",
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 120,
    Cell: ({ row }) => {
      let c: string = SUCCESS_COLOR;
      const expiredAt = new Date(row.original.expiredAt);
      const now = new Date();
      let status = row.original.status;

      if (status === "PURCHASED") {
        c = PURCHASED_COLOR;
        status = "ACTIVE";
        if (now > expiredAt) {
          status = "EXPIRED";
          c = ERROR_COLOR;
        }
      }

      return (
        <Flex align="center" justify="flex-start" gap="xs">
          <IconCircleFilled size={10} color={c} />
          <Text fw="bold" fz="xs" c="gray" tt="capitalize">
            {status.toLocaleLowerCase()}
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
  {
    accessorKey: "usedDate",
    header: "Used Date",
    size: 200,
    Cell: ({ row }) => {
      return row.original.usedDate
        ? formatDateTimeZone(row.original.usedDate)
        : "-";
    },
  },
  {
    accessorKey: "expiredAt",
    header: "Expire Date",
    size: 200,
    Cell: ({ row }) => {
      return row.original.expiredAt
        ? formatDateTimeZone(row.original.expiredAt)
        : "-";
    },
  },
];

export function TransactionList() {
  const { data, isLoading } = usePurchaseReports();

  return (
    <Stack>
      <Group justify="space-between" align="center">
        <Title order={3}>CCN COUPON Report</Title>
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
        columnPinning={{
          right: ["user.phoneNumber", "createdAt", "status"],
        }}
        total={data?.totalCount}
      />
    </Stack>
  );
}
