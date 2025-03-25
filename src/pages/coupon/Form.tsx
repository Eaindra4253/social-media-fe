import { ERROR_COLOR, SUCCESS_COLOR } from "@/configs/constants";
import { createCouponSchema } from "@/configs/schema";
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  NumberInput,
  Select,
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
import { useCreateCoupon, useUpdateCoupon } from "./queries";

export function CouponUpdateForm({ data }: { data: Coupon }) {
  const [opened, { close, open }] = useDisclosure();
  const { isPending, mutateAsync } = useUpdateCoupon(data.id);

  return (
    <>
      <ActionIcon
        size="sm"
        variant="transparent"
        onClick={open}
        title="Update Coupon"
      >
        <IconEdit size={20} />
      </ActionIcon>
      <Modal opened={opened} onClose={close} title="Update Coupon" size="lg">
        <CouponForm
          isPending={isPending}
          initialValues={{
            code: data.code,
            name: data.name,
            description: data.description,
            amount: data.amount,
            thumbnail: data.thumbnail,
            imageUrl: data.imageUrl,
            logo: data.logo,
            validDays: data.validDays,
            category: data.category,
            couponType: data.couponType,
            outletType: data.outletType,
          }}
          handleSubmit={(values: Partial<CreateCouponRequest>) =>
            mutateAsync(values).then(close)
          }
        />
      </Modal>
    </>
  );
}

export function CouponDisableForm({ data }: { data: Coupon }) {
  const { mutateAsync } = useUpdateCoupon(data.id);

  const isActive = data.isActive === true ? false : true;
  const statusField = data.isActive === true ? "Inactive" : "Active";

  const confirmDialog = () => {
    modals.openConfirmModal({
      title: `${statusField} Coupon`,
      children: `Are you sure you want to ${statusField} this Coupon?`,
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

export function CouponCreateForm() {
  const [opened, { close, open }] = useDisclosure();
  const { mutateAsync, isPending } = useCreateCoupon();

  return (
    <>
      <Button onClick={open} leftSection={<IconPlus />} radius="md" size="xs">
        Create Coupon
      </Button>
      <Modal opened={opened} onClose={close} title="Add Coupon" size="lg">
        <CouponForm
          isPending={isPending}
          handleSubmit={(values) => mutateAsync(values).then(close)}
        />
      </Modal>
    </>
  );
}

type CouponFormProps = {
  isPending: boolean;
  initialValues?: CreateCouponRequest;
  handleSubmit: (values: CreateCouponRequest) => Promise<void>;
};

export function CouponForm({
  isPending,
  initialValues,
  handleSubmit,
}: CouponFormProps) {
  const form = useForm<CreateCouponRequest>({
    initialValues: initialValues ?? {
      code: "",
      name: "",
      description: "",
      amount: 1,
      thumbnail: "",
      imageUrl: "",
      logo: "",
      validDays: 1,
      category: "E-TICKET",
      couponType: "EMONEY",
      outletType: "PREMIER",
    },
    validate: zodResolver(createCouponSchema),
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        handleSubmit(values).then(() => form.reset())
      )}
    >
      <Stack>
        <TextInput
          label="Code"
          placeholder="Enter Code"
          {...form.getInputProps("code")}
        />
        <TextInput
          label="Name"
          placeholder="Enter Name"
          {...form.getInputProps("name")}
        />
        <Textarea
          label="Description"
          placeholder="Enter Description"
          rows={4}
          {...form.getInputProps("description")}
        />
        <NumberInput
          label="Point Amount"
          placeholder="Enter Point Amount"
          {...form.getInputProps("amount")}
        />
        <TextInput
          label="Thumbnail URL"
          placeholder="Enter Thumbnail URL"
          {...form.getInputProps("thumbnail")}
        />
        <TextInput
          label="Image URL"
          placeholder="Enter Image URL"
          {...form.getInputProps("imageUrl")}
        />
        <TextInput
          label="Logo"
          placeholder="Enter Logo"
          {...form.getInputProps("logo")}
        />
        <NumberInput
          label="Valid Days"
          placeholder="Enter Valid Days"
          {...form.getInputProps("validDays")}
        />
        <TextInput
          label="Category"
          placeholder="Enter Category"
          {...form.getInputProps("category")}
        />
        <Select
          label="Coupon Type"
          placeholder="Pick one"
          data={[
            { value: "EMONEY", label: "EMONEY" },
            { value: "E", label: "E" },
          ]}
          {...form.getInputProps("couponType")}
        />
        <Select
          label="Outlet Type"
          placeholder="Pick one"
          data={[
            { value: "PREMIER", label: "PREMIER" },
            { value: "GNG", label: "GNG" },
            { value: "CAPITAL", label: "CAPITAL" },
          ]}
          {...form.getInputProps("outletType")}
        />

        <Group justify="flex-end" gap="sm">
          <Button
            loading={isPending}
            disabled={isPending}
            leftSection={initialValues ? <IconEdit /> : <IconPlus />}
            type="submit"
          >
            {initialValues ? "Update" : "Add"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
