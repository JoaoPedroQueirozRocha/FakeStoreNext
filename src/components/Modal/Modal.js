import { Avatar, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUser } from "@tabler/icons-react";

export default function ModalPerfil(props) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Modal opened={open}>
      <Group>
        <Avatar radius="xl" color="cyan">
          <IconUser size={100}></IconUser>
        </Avatar>
      </Group>
    </Modal>
  );
}
