import { DataTable } from "@/components/table/DataTable";
import { Flex, Group, Stack, Title } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { CouponCreateForm, CouponDisableForm, CouponUpdateForm } from "./Form";
import { useGetCoupons } from "./queries";
import { formatDateTimeZone } from "@/utils/date";
import { IconCircleFilled } from "@tabler/icons-react";
import { Text } from "@mantine/core";

const columns: MRT_ColumnDef<Coupon>[] = [
  {
    accessorKey: "code",
    header: "Code",
    size: 100,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    size: 100,
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 200,
  },
  {
    accessorKey: "category",
    header: "Category",
    size: 150,
  },
  {
    accessorKey: "couponType",
    header: "Coupon Type",
    size: 150,
  },
  {
    accessorKey: "outletType",
    header: "Outlet Type",
    size: 150,
  },
  {
    accessorKey: "description",
    header: "Description",
    size: 200,
  },
  {
    accessorKey: "remark",
    header: "Remark",
    size: 150,
    Cell: ({ row }) => {
      return row.original.remark ?? "-";
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    size: 150,
    Cell: ({ row }) => {
      return row.original.createdAt !== "-"
        ? formatDateTimeZone(row.original.createdAt)
        : "-";
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    size: 150,
    Cell: ({ row }) => {
      return row.original.updatedAt !== "-"
        ? formatDateTimeZone(row.original.updatedAt)
        : "-";
    },
  },
  {
    accessorKey: "validDays",
    header: "Valid Days",
    size: 100,
  },
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",  
    size: 100,
  },
  {
    accessorKey: "imageUrl",
    header: "Image URL",
    size: 100,
  },
  {
    accessorKey: "logo",
    header: "Logo",
    size: 100,
  },
  {
    accessorKey: "isActive",
    header: "Is Active",
    size: 100,
    Cell: ({ row }) => {
      const c = row.original.isActive === true ? "#00cc88" : "#ff3366";
      const status = row.original.isActive === true ? "Active" : "Inactive";

      return (
        <Flex align="center" justify="flex-start" gap="xs">
          <IconCircleFilled size={10} color={c} />
          <Text fw="bold" fz="xs" c="gray" tt="capitalize">
            {status}
          </Text>
        </Flex>
      );
    },
  },
  {
    accessorKey: "_id",
    header: "Actions",
    size: 150,
    Cell: ({ row }) => {
      return (
        <Flex gap="xs">
          <CouponUpdateForm data={row.original} key={row.id} />
          <CouponDisableForm data={row.original} key={`${row.id}-disable`} />
        </Flex>
      );
    },
  },
];

export function CouponList() {
  const { data, isLoading } = useGetCoupons();

  return (
    <Stack>
      <Group justify="space-between" align="center">
        <Title order={3}>COUPON LIST</Title>
        <Flex gap="sm">
          <CouponCreateForm />
        </Flex>
      </Group>
      <DataTable<Coupon>
        data={data?.data ?? []}
        columns={columns}
        isLoading={isLoading}
        columnPinning={{
          right: ["_id"],
        }}
        total={data?.totalCount ?? 0}
      />
    </Stack>
  );
}
