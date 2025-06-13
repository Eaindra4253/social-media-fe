import { AuthorizedPage, Can } from "@/components/Can";
import { CopyText } from "@/components/CopyText";
import {
  CardCouponStatusFilter,
  PaymentStatusFilter,
  SearchInput,
} from "@/components/Filter";
import { DataTable } from "@/components/table/DataTable";
import { formatDateTimeZone } from "@/utils/date";
import { Flex, Group, Stack, Text, Title } from "@mantine/core";
import { IconCircleFilled } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
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
    Cell: ({ row }) => {
      const trans = row.original.CardCouponTransaction;

      if (!trans)
        return (
          <Text size="xs" c="gray.5">
            UNCLAIMED
          </Text>
        );

      return trans.referenceId ? (
        <CopyText>{String(trans.referenceId)}</CopyText>
      ) : (
        <Text size="xs" c="orange.5" fw="bold">
          UNPAID
        </Text>
      );
    },
  },
  {
    accessorKey: "claimBy",
    header: "Claimed By",
    size: 150,
    Cell: ({ row }) =>
      row.original.CardCouponTransaction?.claimBy?.fullName || (
        <Text size="xs" c="gray.5">
          UNCLAIMED
        </Text>
      ),
  },
  {
    accessorKey: "phoneNumber",
    header: "Claimed By Phone",
    size: 150,
    Cell: ({ row }) => {
      const phoneNumber =
        row.original.CardCouponTransaction?.claimBy?.phoneNumber;

      if (!phoneNumber)
        return (
          <Text size="xs" c="gray.5">
            UNCLAIMED
          </Text>
        );

      return <CopyText>{phoneNumber}</CopyText>;
    },
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

      if (!trans)
        return (
          <Text size="xs" c="gray.5">
            UNCLAIMED
          </Text>
        );

      return trans?.createdAt ? (
        formatDateTimeZone(trans?.createdAt)
      ) : (
        <Text size="xs" c="orange.5" fw="bold">
          UNPAID
        </Text>
      );
    },
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
    size: 200,
    Cell: ({ row }) => {
      const trans = row.original.CardCouponTransaction;

      if (!trans)
        return (
          <Text size="xs" c="gray.5">
            UNCLAIMED
          </Text>
        );

      return trans?.paymentDate ? (
        formatDateTimeZone(trans?.paymentDate)
      ) : (
        <Text size="xs" c="orange.5" fw="bold">
          UNPAID
        </Text>
      );
    },
  },

  {
    accessorKey: "paymentStatus",
    header: "Disburse Status",
    size: 120,
    Cell: ({ row }) => {
      const status = row.original.CardCouponTransaction?.paymentStatus;

      if (!status)
        return (
          <Text size="xs" c="gray.5">
            UNCLAIMED
          </Text>
        );
      return (
        <Flex gap="xs" align="center">
          <IconCircleFilled
            size={12}
            color={status === "SUCCESS" ? "#00A300" : "#FFB800"}
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
          <Flex gap="sm">
            <SearchInput />
            <PaymentStatusFilter />
            <CardCouponStatusFilter />
            <Can permission="LUCKY_DRAW_UPLOAD">
              <ExcelUploadButton />
            </Can>
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
