import { createUserSchema, updateUserSchema } from "@/configs/schema";
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  PasswordInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCircleCheck,
  IconCircleX,
  IconEdit,
  IconLock,
  IconPlus,
} from "@tabler/icons-react";
import { useCreateUser, useUpdateUser } from "./queries";
import { ERROR_COLOR, SUCCESS_COLOR, WARNING_COLOR } from "@/configs/constants";
import { modals } from "@mantine/modals";
import { z } from "zod";

export function UserCreateForm() {
  const [opened, { close, open }] = useDisclosure();
  const { mutateAsync, isPending } = useCreateUser();

  return (
    <>
      <Button onClick={open} leftSection={<IconPlus />} radius="md" size="xs">
        Add User
      </Button>
      <Modal opened={opened} onClose={close} title="Add User" size="lg">
        <UserForm
          mode="create"
          isPending={isPending}
          handleSubmit={(values) => mutateAsync(values).then(close)}
        />
      </Modal>
    </>
  );
}

export function UserUpdateForm({ data }: { data: User }) {
  const [opened, { close, open }] = useDisclosure();
  const { isPending, mutateAsync } = useUpdateUser(data.id);

  return (
    <>
      <ActionIcon
        size="sm"
        variant="transparent"
        onClick={open}
        title="Update User"
      >
        <IconEdit size={20} />
      </ActionIcon>
      <Modal opened={opened} onClose={close} title="Update User">
        <UserForm
          isPending={isPending}
          initialValues={{
            email: data.email,
            username: data.username,
            role: data.role,
            outletType: data.outletType,
          }}
          handleSubmit={(values) => mutateAsync(values).then(close)}
          mode="update"
        />
      </Modal>
    </>
  );
}

export function UserPasswordChangeForm({ data }: { data: User }) {
  const [opened, { close, open }] = useDisclosure();
  const { isPending, mutateAsync } = useUpdateUser(data.id);

  const form = useForm<{ password: string }>({
    initialValues: {
      password: "",
    },
    validate: ({ password }) => ({
      password: password.length ? undefined : "Enter new password",
    }),
  });

  return (
    <>
      <ActionIcon
        onClick={open}
        size="sm"
        color={WARNING_COLOR}
        variant="transparent"
        title="Change Password"
      >
        <IconLock size={20} />
      </ActionIcon>
      <Modal
        opened={opened}
        onClose={close}
        title={`Change Password for User "${data?.username}"`}
      >
        <form
          onSubmit={form.onSubmit((values) =>
            mutateAsync(values).then(() => {
              form.reset();
              close();
            })
          )}
        >
          <Stack gap="sm">
            <PasswordInput
              label="New Password"
              placeholder="Enter New Password"
              {...form.getInputProps("password")}
            />
            <Group gap="xs" justify="end">
              <Button variant="outline" onClick={close}>
                Cancel
              </Button>
              <Button loading={isPending} type="submit">
                Submit
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}

export function UserDisableForm({ data }: { data: User }) {
  const { mutateAsync } = useUpdateUser(data.id);

  const isActive = data.isActive ? false : true;
  const statusField = data.isActive ? "Inactive" : "Active";

  const confirmDialog = () => {
    modals.openConfirmModal({
      title: `${statusField} User`,
      children: `Are you sure you want to ${statusField} this User?`,
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

type UserFormProps =
  | {
      mode: "create";
      isPending: boolean;
      initialValues?: z.infer<typeof createUserSchema>;
      handleSubmit: (values: z.infer<typeof createUserSchema>) => Promise<void>;
    }
  | {
      mode: "update";
      isPending: boolean;
      initialValues: z.infer<typeof updateUserSchema>;
      handleSubmit: (values: z.infer<typeof updateUserSchema>) => Promise<void>;
    };

export function UserForm({
  isPending,
  initialValues,
  handleSubmit,
  mode,
}: UserFormProps) {
  const schema = mode === "create" ? createUserSchema : updateUserSchema;

  const form = useForm<z.infer<typeof schema>>({
    initialValues: initialValues ?? {
      username: "",
      password: "",
      email: "",
      outletType: "",
      role: "",
      isActive: true,
    },
    validate: zodResolver(schema),
  });

  return (
    <form
      onSubmit={form.onSubmit((values: any) =>
        handleSubmit(values).then(() => form.reset())
      )}
    >
      <Stack>
        <TextInput
          label="Username"
          placeholder="Enter Username"
          {...form.getInputProps("username")}
        />
        {mode === "create" && (
          <PasswordInput
            autoComplete="new-password"
            label="Password"
            placeholder="Enter Password"
            {...form.getInputProps("password")}
          />
        )}
        <TextInput
          autoComplete="off"
          label="Email"
          placeholder="Enter Email"
          {...form.getInputProps("email")}
        />
        <Select
          searchable={false}
          label="Role"
          placeholder="Select Role"
          clearable
          data={[
            {
              label: "Admin",
              value: "ADMIN",
            },
            {
              label: "Scanner",
              value: "SCANNER",
            },
          ]}
          {...form.getInputProps("role")}
        />
        <Select
          searchable={false}
          label="Outlet Type"
          placeholder="Select Outlet Type"
          clearable
          data={[
            {
              label: "GNG",
              value: "GNG",
            },
            {
              label: "CAPITAL",
              value: "CAPITAL",
            },
            {
              label: "PREMIER",
              value: "PREMIER",
            },
          ]}
          {...form.getInputProps("outletType")}
        />
        <Group justify="flex-end" gap="sm">
          <Button
            loading={isPending}
            disabled={isPending}
            leftSection={mode === "create" ? <IconPlus /> : <IconEdit />}
            type="submit"
          >
            {mode === "create" ? "Add" : "Update"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
