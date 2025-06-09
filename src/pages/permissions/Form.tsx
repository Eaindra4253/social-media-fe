import { useDisclosure } from "@mantine/hooks";
import { useCreatePermission, useUpdatePermission } from "./quries";
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import {
  IconCircleCheck,
  IconCircleX,
  IconEdit,
  IconPlus,
} from "@tabler/icons-react";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import {
  createPermissionSchema,
  updatePermissionSchema,
} from "@/configs/schema";
import { modals } from "@mantine/modals";
import { ERROR_COLOR, SUCCESS_COLOR } from "@/configs/constants";

export function PermissionCreateForm() {
  const [opened, { close, open }] = useDisclosure();
  const { mutateAsync, isPending } = useCreatePermission();

  return (
    <>
      <Button onClick={open} leftSection={<IconPlus />} radius="md" size="xs">
        Add Permission
      </Button>
      <Modal opened={opened} onClose={close} title="Add Permission" size="lg">
        <PermissionForm
          isPending={isPending}
          handleSubmit={(values) => mutateAsync(values).then(close)}
        />
      </Modal>
    </>
  );
}

type PermissionFormProps = {
  isPending: boolean;
  initialValues?: z.infer<typeof updatePermissionSchema>;
  handleSubmit: (
    values:
      | z.infer<typeof createPermissionSchema>
      | z.infer<typeof updatePermissionSchema>
  ) => Promise<void>;
};

export function PermissionForm({
  isPending,
  initialValues,
  handleSubmit,
}: PermissionFormProps) {
  const schema = initialValues
    ? updatePermissionSchema
    : createPermissionSchema;

  const form = useForm({
    initialValues: initialValues ?? {
      name: "",
      code: "",
      description: "",
    },
    validate: zodResolver(schema),
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        handleSubmit(values).then(() => form.reset())
      )}
    >
      <Stack>
        <TextInput
          label="Name"
          placeholder="Enter Role Name"
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Code"
          placeholder="Enter Code"
          {...form.getInputProps("code")}
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

export function PermissionUpdateForm({ data }: { data: Permission }) {
  const [opened, { close, open }] = useDisclosure();
  const { isPending, mutateAsync } = useUpdatePermission(data.id);

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
      <Modal opened={opened} onClose={close} title="Update Permission">
        <PermissionForm
          isPending={isPending}
          initialValues={{
            name: data.name,
            code: data.code,
            description: data.description,
          }}
          handleSubmit={(values) => mutateAsync(values).then(close)}
        />
      </Modal>
    </>
  );
}

export function PermissionDisableForm({ data }: { data: Permission }) {
  const { mutateAsync } = useUpdatePermission(data.id);

  const isActive = data.isActive ? false : true;
  const statusField = data.isActive ? "Inactive" : "Active";

  const confirmDialog = () => {
    modals.openConfirmModal({
      title: `${statusField} Permission`,
      children: `Are you sure you want to ${statusField} this Permission?`,
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
