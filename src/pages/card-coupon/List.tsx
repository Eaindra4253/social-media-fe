import { Can } from "@/components/Can";
import {
  CardCouponStatusFilter,
  PaymentStatusFilter,
  SearchInput,
} from "@/components/Filter";
import { DataTable } from "@/components/table/DataTable";
import { formatDateTimeZone } from "@/utils/date";
import { Flex, Group, Stack, Text, Title } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useCardCouponReports } from "./quries";
import { IconCircleFilled } from "@tabler/icons-react";
import { CardCouponForm } from "./Form";

const columns: MRT_ColumnDef<CardCoupon>[] = [
  {
    accessorKey: "serialNo",
    header: "Serial Number",
    size: 150,

    Cell: ({ row }) => {
      return <Text>{row.original.serialNo || "-"}</Text>;
    },
  },
  {
    accessorKey: "CardCouponTransaction.cardCouponId",
    header: "Card Coupon ID",
    size: 150,
    Cell: ({ row }) => {
      return <Text>{row.original.CardCouponTransaction.cardCouponId || "-"}</Text>;
    },
  },
  {
    accessorKey: "priceCode",
    header: "Price Code",
    size: 100,
    Cell: ({ row }) => {
      return <Text>{row.original.priceCode || "-"}</Text>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    size: 100,
    Cell: ({ row }) => {
      return <Text>{row.original.price || "-"}</Text>;
    },
  },
  {
    accessorKey: "batchCode",
    header: "Batch Code",
    size: 100,
    Cell: ({ row }) => {
      return <Text>{row.original.batchCode || "-"}</Text>;
    },
  },
  {
    accessorKey: "CardCouponTransaction.claimBy.fullName",
    header: "Claimed By",
    size: 100,
    Cell: ({ row }) => {
      return (
        <Text>
          {row.original.CardCouponTransaction?.claimBy?.fullName || "-"}
        </Text>
      );
    },
  },
  {
    accessorKey: "CardCouponTransaction.claimBy.phoneNumber",
    header: "Claimed By Phone",
    size: 100,
    Cell: ({ row }) => {
      return (
        <Text>
          {row.original.CardCouponTransaction?.claimBy?.phoneNumber || "-"}
        </Text>
      );
    },
  },
  {
    accessorKey: "CardCouponTransaction.remark",
    header: "Remark",
    size: 100,
    Cell: ({ row }) => {
      return <Text>{row.original.CardCouponTransaction?.remark || "-"}</Text>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    size: 200,
    Cell: ({ row }) => {
      return row.original.createdAt
        ? formatDateTimeZone(row.original.createdAt)
        : "-";
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated Date",
    size: 200,
    Cell: ({ row }) => {
      return row.original.updatedAt
        ? formatDateTimeZone(row.original.updatedAt)
        : "-";
    },
  },
    {
    accessorKey: "CardCouponTransaction.paymentDate",
    header: "Payment Date",
    size: 200,
    Cell: ({ row }) => {
      return row.original.CardCouponTransaction?.paymentDate
        ? formatDateTimeZone(row.original.CardCouponTransaction.paymentDate)
        : "-";
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 100,
    Cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Flex gap="xs" align="center">
          <IconCircleFilled
            size={12}
            color={
              status === "ACTIVE"
                ? "#00A300"
                : status === "USED"
                ? "#FFB800"
                : "#FF0000"
            }
          />
          <Text fw="bold" fz="xs" c="gray" tt="capitalize">
            {status?.toLocaleLowerCase() ?? "-"}
          </Text>
        </Flex>
      );
    },
  },
  {
    accessorKey: "CardCouponTransaction.paymentStatus",
    header: "Payment Status",
    size: 200,
    Cell: ({ row }) => {
      const status = row.original.CardCouponTransaction?.paymentStatus;
      return (
        <Flex gap="xs" align="center">
          <IconCircleFilled
            size={12}
            color={
              status === "SUCCESS"
                ? "#00A300"
                : status === "PENDING"
                ? "#FFB800"
                : "#FF0000"
            }
          />
          <Text fw="bold" fz="xs" c="gray" tt="capitalize">
            {status?.toLocaleLowerCase() ?? "-"}
          </Text>
        </Flex>
      );
    },
  },
  {
    accessorKey: "_id",
    header: "Actions",
    size: 100,
    Cell: ({ row }) => {
      const paymentStatus = row.original.CardCouponTransaction?.paymentStatus;
      const showPaymentButton =
        paymentStatus === "PENDING" ||
        paymentStatus === "FAILED" ||
        !paymentStatus;

      return (
        <Flex gap="xs">
          {showPaymentButton && (
            <CardCouponForm
              data={{
                transactionId: row.original.CardCouponTransaction?.id ?? "",
                remark: "",
              }}
            />
          )}
        </Flex>
      );
    },
  },
];

export function CardCouponList() {
  const { data, isLoading } = useCardCouponReports();

  return (
    <Can roles={["ADMIN", "SUPER_ADMIN"]}>
      <Stack>
        <Group justify="space-between" align="center">
          <Title order={3}>Card Coupon Reports</Title>
          <Flex gap="sm">
            <SearchInput />
            <PaymentStatusFilter />
            <CardCouponStatusFilter />
          </Flex>
        </Group>
        <DataTable<CardCoupon>
          data={data?.data ?? []}
          columns={columns}
          isLoading={isLoading}
          columnPinning={{
            right: ["createdAt", "CardCouponTransaction.paymentStatus", "_id"],
          }}
          total={data?.totalCount}
        />
      </Stack>
    </Can>
  );
}
