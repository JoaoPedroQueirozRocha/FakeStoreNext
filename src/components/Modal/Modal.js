import { Avatar, Group, Input, Modal, Title, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Notifications, notifications } from "@mantine/notifications";
import { IconUser } from "@tabler/icons-react";
import useRouter from "next/router";
import { useState } from "react";

export default function ModalPerfil({ onClose }) {
  let database = JSON.parse(localStorage.getItem("dataUsers"));
  let userId = JSON.parse(localStorage.getItem("userKey"));

  const [opened, { open, close }] = useDisclosure(false);
  const [loged, setLoged] = useState(true);

  const usuario = database.users.find((item) => item.id == userId);

  const handleClose = () => {
    close();
    onClose(false);
  };

  const logout = () => {
    notifications.show({
      title: "Loged out",
      message: "Deslogado com sucesso",
      color: "red",
      autoClose: 5000,
    });
    window.location.reload();
    localStorage.removeItem("userKey");
    setLoged(false);
  };

  return loged ? (
    <Modal opened={open} onClose={(close, handleClose)}>
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <Group>
            <Avatar radius={100} color="cyan" size={105}>
              <IconUser size={100} className="m-3"></IconUser>
            </Avatar>
            <Title>{usuario.username}</Title>
          </Group>
          <div className="flex flex-row">
            <Group spacing="xs">
              <Text size="lg">Email: </Text>
              <Text baseline>{usuario.email}</Text>
            </Group>
          </div>
          <Text onClick={logout} className="cursor-pointer">
            Logout
          </Text>
        </div>
      </Modal.Body>
      <Notifications />
    </Modal>
  ) : null;
}
