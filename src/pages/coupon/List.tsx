import { ImagePreviewButton } from "@/components/ImagePreviewButton";
import { DataTable } from "@/components/table/DataTable";
import { formatDateTimeZone } from "@/utils/date";
import { Flex, Group, Stack, Text, Title } from "@mantine/core";
import { IconCircleFilled } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { CouponCreateForm, CouponDisableForm, CouponUpdateForm } from "./Form";
import { useGetCoupons } from "./queries";
import { CouponStatusFilter, CouponTypeFilter, OutletTypeFilter } from "@/components/Filter";

const columns: MRT_ColumnDef<Coupon>[] = [
  {
    accessorKey: "name",
    header: "Name",
    size: 240,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    size: 100,
  },
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    size: 150,
    Cell: ({ row }) =>
      row.original.thumbnail ? (
        <Flex align="center" justify="flex-start" gap="xs">
          <ImagePreviewButton
            imageUrl={`${import.meta.env.VITE_API_URL}/${
              row.original.thumbnail
            }`}
            label={row.original.thumbnail}
          />
        </Flex>
      ) : (
        "-"
      ),
  },
  {
    accessorKey: "imageUrl",
    header: "Image URL",
    size: 150,
    Cell: ({ row }) =>
      row.original.imageUrl ? (
        <Flex align="center" justify="flex-start" gap="xs">
          <ImagePreviewButton
            imageUrl={`${import.meta.env.VITE_API_URL}/${
              row.original.imageUrl
            }`}
            label={row.original.imageUrl}
          />
        </Flex>
      ) : (
        "-"
      ),
  },
  {
    accessorKey: "logo",
    header: "Logo",
    size: 100,
    Cell: ({ row }) =>
      row.original.logo ? (
        <Flex align="center" justify="flex-start" gap="xs">
          <ImagePreviewButton
            imageUrl={`${import.meta.env.VITE_API_URL}/${row.original.logo}`}
            label={row.original.logo}
          />
        </Flex>
      ) : (
        "-"
      ),
  },
  {
    accessorKey: "code",
    header: "Code",
    size: 100,
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
    Cell: ({ row }) => <Text lineClamp={2}>{row.original.description}</Text>,
  },
  {
    accessorKey: "remark",
    header: "Remark",
    size: 150,
    Cell: ({ row }) => {
      return <Text lineClamp={2}>{row.original.remark ?? "-"}</Text>;
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
    size: 100,
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
          <CouponTypeFilter />
          <OutletTypeFilter />
          <CouponStatusFilter />
          <CouponCreateForm />
        </Flex>
      </Group>
      <DataTable<Coupon>
        data={data?.data ?? []}
        columns={columns}
        isLoading={isLoading}
        columnPinning={{
          right: ["isActive", "_id"],
        }}
        total={data?.totalCount ?? 0}
      />
    </Stack>
  );
}
