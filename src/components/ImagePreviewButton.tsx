import { Button, Image, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function ImagePreviewButton({
  label,
  imageUrl,
}: {
  imageUrl: string;
  label: string;
}) {
  const [opened, { close, open }] = useDisclosure();

  return (
    <>
      <Button size="xs" variant="light" onClick={open}>
        {label}
      </Button>
      <Modal opened={opened} onClose={close} size="lg">
        <Image src={imageUrl} alt={label} width={300} height={300} />
      </Modal>
    </>
  );
}
