import { AuthorizedPage } from "@/components/Can";
import { DataTable } from "@/components/table/DataTable";
import { formatDateTimeZone } from "@/utils/date";
import { Flex, Group, Stack, Title } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import {
  PermissionCreateForm,
  PermissionDisableForm,
  PermissionUpdateForm,
} from "./Form";
import { useGetPermissions } from "./quries";

const columns: MRT_ColumnDef<Permission, unknown>[] = [
  {
    accessorKey: "name",
    header: "Name",
    size: 200,
  },
  {
    accessorKey: "code",
    header: "Code",
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
          <PermissionUpdateForm data={row.original} key={row.id} />
          <PermissionDisableForm
            data={row.original}
            key={`${row.id}-disable`}
          />
        </Flex>
      );
    },
  },
];

export function PermissionsList() {
  const { data, isLoading } = useGetPermissions();

  return (
    <AuthorizedPage permission="PERMISSION_LIST">
      <Stack>
        <Group justify="space-between" align="center">
          <Title order={3}>PERMISSION LIST</Title>
          <Flex gap="sm">
            <PermissionCreateForm />
          </Flex>
        </Group>
        <DataTable<Permission>
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
