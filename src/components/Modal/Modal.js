import { Avatar, Group, Input, Modal, Title, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUser } from "@tabler/icons-react";
import { useState } from "react";

export default function ModalPerfil({ onClose }) {
  const [opened, { open, close }] = useDisclosure(false);

  const handleClose = () => {
    close();
    onClose(false);
  };

  return (
    <Modal opened={open} onClose={(close, handleClose)}>
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <Group>
            <Avatar radius={100} color="cyan" size={100}>
              <IconUser size={100}></IconUser>
            </Avatar>
            <Title>Username</Title>
          </Group>
          <div className="flex flex-row">
            <Group spacing="xs">
              <Text size="lg">Email: </Text>
              <Text baseline>email@email.com</Text>
            </Group>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
