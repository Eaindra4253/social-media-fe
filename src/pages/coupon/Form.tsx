import { OutletTypeSelect } from "@/components/selects/OutletTypeSelect";
import { PhotoSelect } from "@/components/selects/PhotoSelect";
import { ERROR_COLOR, SUCCESS_COLOR } from "@/configs/constants";
import { createCouponSchema } from "@/configs/schema";
import { useAuthStore } from "@/stores/auth.store";
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
            remark: data.remark,
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
            productId: data.productId,
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

  const isActive = data.isActive ? false : true;
  const statusField = data.isActive ? "Inactive" : "Active";

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
  const user = useAuthStore((state) => state.user);

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
      remark: "",
      category: "",
      couponType: "",
      outletType: user?.outletType,
      productId: "",
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
        <TextInput
          label="Category"
          placeholder="Enter Category"
          {...form.getInputProps("category")}
        />
        <Textarea
          label="Description"
          placeholder="Enter Description"
          rows={4}
          {...form.getInputProps("description")}
        />
        <Textarea
          label="Remark"
          placeholder="Enter Remark"
          rows={4}
          {...form.getInputProps("remark")}
        />
        {!initialValues && (
          <NumberInput
            label="Amount"
            placeholder="Enter Amount"
            {...form.getInputProps("amount")}
          />
        )}
        <Select
          label="Coupon Type"
          placeholder="Pick one"
          data={[
            { value: "EMONEY", label: "EMONEY" },
            { value: "POINT", label: "POINT" },
          ]}
          {...form.getInputProps("couponType")}
        />
        <PhotoSelect
          type="THUMBNAIL"
          label="Thumbnail URL"
          placeholder="Enter Thumbnail URL"
          {...form.getInputProps("thumbnail")}
        />
        <PhotoSelect
          type="IMAGE_URL"
          label="Image URL"
          placeholder="Enter Image URL"
          {...form.getInputProps("imageUrl")}
        />
        <PhotoSelect
          type="LOGO"
          label="Logo"
          placeholder="Enter Logo"
          {...form.getInputProps("logo")}
        />
        <NumberInput
          label="Valid Days"
          placeholder="Enter Valid Days"
          {...form.getInputProps("validDays")}
        />
        {!user?.outletType ? (
          <OutletTypeSelect
            placeholder="Pick one"
            {...form.getInputProps("outletType")}
          />
        ) : null}

        <Select
          label="Product ID"
          placeholder="Select a Product ID"
          data={[
            { value: "PREMIER_COUPON", label: "PREMIER COUPON" },
            {
              value: "COUPON_MARKETPLACE_PRODUCT",
              label: "GNG COUPON",
            },
            { value: "MERCHANDISE_COUPON", label: "CAPITAL COUPON" },
            {
              value: "HOTPOT_CITY_DISCOUNT_COUPON_PRODUCT",
              label: "Hotpot City",
            },
          ]}
          {...form.getInputProps("productId")}
        />

        <Group justify="flex-end">
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
