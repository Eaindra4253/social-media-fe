import { modals } from "@mantine/modals";
import { useDeletePhoto } from "./queries";
import { ActionIcon, Center } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

export function PhotoDeleteForm({ id }: { id: number }) {
  const { mutateAsync: deletePhoto } = useDeletePhoto();

  const confirmDialog = () => {
    modals.openConfirmModal({
      title: `Delete Photo`,
      children: `Are you sure you want to delete this Photo?`,
      labels: {
        confirm: "Delete",
        cancel: "Cancel",
      },
      onConfirm: () => {
        deletePhoto(id).then(() => {
          modals.closeAll();
        });
      },
    });
  };

  return (
    <Center>
      <ActionIcon color="red" onClick={confirmDialog} variant="transparent">
        <IconTrash size={20} />
      </ActionIcon>
    </Center>
  );
}