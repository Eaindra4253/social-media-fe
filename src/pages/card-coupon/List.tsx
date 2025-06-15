import { AuthorizedPage, Can } from "@/components/Can";
import {
  CardCouponStatusFilter,
  DateRangeFilter,
  PaymentStatusFilter,
  SearchInput,
} from "@/components/Filter";
import { DataTable } from "@/components/table/DataTable";
import { formatDateTimeZone } from "@/utils/date";
import { Flex, Group, Stack, Text, Title } from "@mantine/core";
import { IconCircleFilled } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { DownloadReport } from "./DownloadReport";
import { ExcelUploadButton } from "./ExcelUploadButton";
import { useCardCouponReports } from "./quries";

const columns: MRT_ColumnDef<CardCoupon>[] = [
  {
    accessorKey: "price",
    header: "Prize",
    size: 100,
  },
  {
    accessorKey: "referenceId",
    header: "Reference ID",
    size: 150,
    Cell: ({ row }) => row.original.CardCouponTransaction?.referenceId || "-",
  },
  {
    accessorKey: "claimBy",
    header: "Claimed By",
    size: 150,
    Cell: ({ row }) =>
      row.original.CardCouponTransaction?.claimBy?.fullName || "-",
  },
  {
    accessorKey: "phoneNumber",
    header: "Claimed By Phone",
    size: 150,
    Cell: ({ row }) =>
      row.original.CardCouponTransaction?.claimBy?.phoneNumber || "-",
  },
  {
    accessorKey: "remark",
    header: "Remark",
    size: 250,
    Cell: ({ row }) => row.original.CardCouponTransaction?.remark || "-",
  },
  {
    accessorKey: "transactionDate",
    header: "Transaction Date",
    size: 200,
    Cell: ({ row }) => {
      const trans = row.original.CardCouponTransaction;

      if (!trans) return "-";

      return formatDateTimeZone(trans?.createdAt);
    },
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
    size: 200,
    Cell: ({ row }) => {
      const trans = row.original.CardCouponTransaction;

      if (!trans?.paymentDate) return "-";

      return formatDateTimeZone(trans?.paymentDate);
    },
  },

  {
    accessorKey: "paymentStatus",
    header: "Disburse Status",
    size: 120,
    Cell: ({ row }) => {
      const status = row.original.CardCouponTransaction?.paymentStatus;

      if (!status) return "-";
      return (
        <Flex gap="xs" align="center">
          <IconCircleFilled
            size={12}
            color={status === "SUCCESS" ? "#00A300" : "red"}
          />
          <Text fw="bold" fz="xs" c="gray" tt="capitalize">
            {status?.toLocaleLowerCase()}
          </Text>
        </Flex>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Coupon Status",
    size: 100,
    Cell: ({ row }) => {
      const status = row.original.status;

      return (
        <Flex gap="xs" align="center">
          <IconCircleFilled
            size={12}
            color={status === "ACTIVE" ? "#00A300" : "#FFB800"}
          />
          <Text fw="bold" fz="xs" c="gray" tt="capitalize">
            {status === "USED" ? "Claimed" : status?.toLocaleLowerCase()}
          </Text>
        </Flex>
      );
    },
  },
];

export function CardCouponList() {
  const { data, isLoading } = useCardCouponReports();

  return (
    <AuthorizedPage permission="PREMIER_LUCKY_DRAW">
      <Stack>
        <Group justify="space-between" align="center">
          <Title order={3}>PREMIER Monsoon Campaign Report</Title>
          <Flex gap="sm" align="center">
            <SearchInput />
            <PaymentStatusFilter />
            <CardCouponStatusFilter />
            <DateRangeFilter />
            <Can permission="LUCKY_DRAW_UPLOAD">
              <ExcelUploadButton />
            </Can>
            <DownloadReport />
          </Flex>
        </Group>
        <DataTable<CardCoupon>
          data={data?.data ?? []}
          columns={columns}
          isLoading={isLoading}
          columnPinning={{
            right: ["paymentStatus", "status", "_id"],
          }}
          total={data?.totalCount ?? 0}
        />
      </Stack>
    </AuthorizedPage>
  );
}
