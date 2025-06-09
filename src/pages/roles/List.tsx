import { AuthorizedPage } from "@/components/Can";
import { DataTable } from "@/components/table/DataTable";
import { formatDateTimeZone } from "@/utils/date";
import { Flex, Group, Stack, Title } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { RoleCreateForm, RoleUpdateForm } from "./Form";
import { useGetRoles } from "./quries";

const columns: MRT_ColumnDef<Role, unknown>[] = [
  {
    accessorKey: "name",
    header: "Name",
    size: 200,
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    size: 200,
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
      return <RoleUpdateForm data={row.original} key={row.id} />;
    },
  },
];

export function RolesList() {
  const { data, isLoading } = useGetRoles();

  return (
    <AuthorizedPage permission="ROLE_LIST">
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
    </AuthorizedPage>
  );
}
