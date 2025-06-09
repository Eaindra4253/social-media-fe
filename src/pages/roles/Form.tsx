import { PermissionsSelect } from "@/components/selects/PermissionSelect";
import { ERROR_COLOR, SUCCESS_COLOR } from "@/configs/constants";
import { createRoleSchema, updateRoleSchema } from "@/configs/schema";
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import {
  IconCircleCheck,
  IconCircleX,
  IconEdit,
  IconPlus,
} from "@tabler/icons-react";
import { z } from "zod";
import { useCreateRole, useUpdateRole } from "./quries";

export function RoleCreateForm() {
  const [opened, { close, open }] = useDisclosure();
  const { mutateAsync, isPending } = useCreateRole();

  return (
    <>
      <Button onClick={open} leftSection={<IconPlus />} radius="md" size="xs">
        Add Role
      </Button>
      <Modal opened={opened} onClose={close} title="Add Role" size="lg">
        <RoleForm
          isPending={isPending}
          handleSubmit={(values) => mutateAsync(values).then(close)}
        />
      </Modal>
    </>
  );
}

type RoleFormProps = {
  isPending: boolean;
  initialValues?: z.infer<typeof updateRoleSchema>;
  handleSubmit: (values: Record<string, unknown>) => Promise<void>;
};

export function RoleForm({
  isPending,
  initialValues,
  handleSubmit,
}: RoleFormProps) {
  const schema = initialValues ? updateRoleSchema : createRoleSchema;

  const form = useForm({
    initialValues: initialValues ?? {
      name: "",
      permissions: [],
      description: "",
    },
    validate: zodResolver(schema),
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        handleSubmit({
          ...values,
          permissions: values.permissions.join(","),
        }).then(() => form.reset());
      })}
    >
      <Stack>
        <TextInput
          label="Name"
          placeholder="Enter Role Name"
          {...form.getInputProps("name")}
        />

        <PermissionsSelect
          label="Permissions"
          placeholder="Select Permissions"
          {...form.getInputProps("permissions")}
        />
        <Textarea
          label="Description"
          placeholder="Enter Description"
          rows={4}
          {...form.getInputProps("description")}
        />
        <Group justify="flex-end" gap="sm">
          <Button
            loading={isPending}
            disabled={isPending}
            leftSection={!initialValues ? <IconPlus /> : <IconEdit />}
            type="submit"
          >
            {!initialValues ? "Add" : "Update"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export function RoleUpdateForm({ data }: { data: Role }) {
  const [opened, { close, open }] = useDisclosure();
  const { isPending, mutateAsync } = useUpdateRole(data.id);

  return (
    <>
      <ActionIcon
        size="sm"
        variant="transparent"
        onClick={open}
        title="Update Permission"
      >
        <IconEdit size={20} />
      </ActionIcon>
      <Modal opened={opened} onClose={close} title="Update Role">
        <RoleForm
          isPending={isPending}
          initialValues={{
            name: data.name,
            permissions: data.permissions?.split(",", -1),
            description: data?.description ?? "",
          }}
          handleSubmit={(values) => mutateAsync(values).then(close)}
        />
      </Modal>
    </>
  );
}

export function RoleDisableForm({ data }: { data: Role }) {
  const { mutateAsync } = useUpdateRole(data.id);

  const isActive = data.isActive ? false : true;
  const statusField = data.isActive ? "Inactive" : "Active";

  const confirmDialog = () => {
    modals.openConfirmModal({
      title: `${statusField} Role`,
      children: `Are you sure you want to ${statusField} this Role?`,
      labels: {
        confirm: statusField,
        cancel: "Cancel",
      },
      onConfirm: () => {
        mutateAsync({ isActive }).then(() => {
          modals.closeAll();
        });
      },
    });
  };

  return (
    <>
      <ActionIcon
        size="sm"
        color={statusField === "Active" ? ERROR_COLOR : SUCCESS_COLOR}
        variant="transparent"
        onClick={confirmDialog}
      >
        {statusField === "Active" ? (
          <IconCircleX size={20} />
        ) : (
          <IconCircleCheck size={20} />
        )}
      </ActionIcon>
    </>
  );
}
