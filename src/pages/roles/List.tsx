import { DataTable } from "@/components/table/DataTable";
import { Flex, Group, Stack, Title } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { formatDateTimeZone } from "@/utils/date";
import { useGetRoles } from "./quries";
import { RoleCreateForm, RoleDisableForm, RoleUpdateForm } from "./Form";

const columns: MRT_ColumnDef<Role, unknown>[] = [
  {
    accessorKey: "name",
    header: "Name",
    size: 200,
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    size: 150,
  },
  {
    accessorKey: "description",
    header: "Description",
    size: 200,
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
    accessorKey: "_id",
    header: "Actions",
    size: 50,
    Cell: ({ row }) => {
      return (
        <Flex gap="xs">
          <RoleUpdateForm data={row.original} key={row.id} />
          <RoleDisableForm data={row.original} key={`${row.id}-disable`} />
        </Flex>
      );
    },
  },
];

export function RolesList() {
  const { data, isLoading } = useGetRoles();

  return (
    <Stack>
      <Group justify="space-between" align="center">
        <Title order={3}>Roles LIST</Title>
        <Flex gap="sm">
          <RoleCreateForm />
        </Flex>
      </Group>
      <DataTable<Role>
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
