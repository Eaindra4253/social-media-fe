import { DataTable } from "@/components/table/DataTable";
import { Flex, Group, Stack, Text, Title } from "@mantine/core";
import { IconCircleFilled } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useGetUsers } from "./queries";
import {
  UserCreateForm,
  UserDisableForm,
  UserPasswordChangeForm,
  UserUpdateForm,
} from "./Form";
import { formatDateTimeZone } from "@/utils/date";

const columns: MRT_ColumnDef<User, unknown>[] = [
  {
    accessorKey: "username",
    header: "User Name",
    size: 200,
  },
  {
    accessorKey: "role",
    header: "Role",
    size: 150,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 200,
  },
  {
    accessorKey: "outletType",
    header: "Outlet Type",
    size: 150,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    size: 200,
    Cell: ({ row }) => {
      return row.original.createdAt !== "-"
        ? formatDateTimeZone(row.original.createdAt)
        : "-";
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    size: 200,
    Cell: ({ row }) => {
      return row.original.updatedAt !== "-"
        ? formatDateTimeZone(row.original.updatedAt)
        : "-";
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    size: 100,
    Cell: ({ row }) => {
      const c = row.original.isActive ? "#00cc88" : "#ff3366";
      const status = row.original.isActive ? "Active" : "Inactive";

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
    size: 50,
    Cell: ({ row }) => {
      return (
        <Flex gap="xs">
          <UserUpdateForm data={row.original} key={row.id} />
          <UserPasswordChangeForm
            data={row.original}
            key={`${row.id}-change-password`}
          />
          <UserDisableForm data={row.original} key={`${row.id}-disable`} />
        </Flex>
      );
    },
  },
];

export function UserList() {
  const { data, isLoading } = useGetUsers();

  return (
    <Stack>
      <Group justify="space-between" align="center">
        <Title order={3}>USER LIST</Title>
        <Flex gap="sm">
          <UserCreateForm />
        </Flex>
      </Group>
      <DataTable<User>
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
