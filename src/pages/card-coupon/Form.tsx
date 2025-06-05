import { makePaymentSchema } from "@/configs/schema";
import { Button, Group, Modal, Stack, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useMakePayment } from "./quries";

export function CardCouponForm({
  data,
  enable = false,
}: {
  data: Payment;
  enable?: boolean;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const { isPending, mutateAsync } = useMakePayment(data.transactionId);

  return (
    <>
      <Button onClick={open} radius="md" size="xs" disabled={!enable}>
        Payment
      </Button>
      <Modal opened={opened} onClose={close} title="Payment" size="lg">
        <PaymentForm
          isPending={isPending}
          handleSubmit={(values) => mutateAsync(values).then(close)}
        />
      </Modal>
    </>
  );
}

type PaymentFormProps = {
  isPending: boolean;
  initialValues?: Payment;
  handleSubmit: (values: Payment) => Promise<void>;
};

export function PaymentForm({
  isPending,
  initialValues,
  handleSubmit,
}: PaymentFormProps) {
  const form = useForm<{ remark: string }>({
    initialValues: initialValues ?? {
      remark: "",
    },
    validate: zodResolver(makePaymentSchema),
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        handleSubmit(values as Payment).then(() => form.reset())
      )}
    >
      <Stack>
        <Textarea
          label="Remark"
          placeholder="Enter Remark"
          rows={4}
          {...form.getInputProps("remark")}
        />
        <Group justify="flex-end">
          <Button loading={isPending} disabled={isPending} type="submit">
            Submit
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
