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
      <Button size="lg" variant="transparent" onClick={open} p="0" m="0">
        <Image src={imageUrl} alt={label} fit="contain" />
      </Button>
      <Modal opened={opened} onClose={close} size="lg">
        <Image src={imageUrl} alt={label} width={300} height={300} />
      </Modal>
    </>
  );
}
