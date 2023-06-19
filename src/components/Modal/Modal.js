import { Avatar, Group, Input, Modal, Title, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ModalPerfil({ onClose }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [loged, setLoged] = useState(true);
  const router = useRouter();
  let database = JSON.parse(localStorage.getItem("database"));
  let userId = JSON.parse(localStorage.getItem("userId"));

  const usuario = database.users.find((item) => item.id == userId);
  console.log(usuario);

  const handleClose = () => {
    close();
    onClose(false);
  };

  const logout = () => {
    localStorage.removeItem("userId");
    setLoged(false);
    router.replace("/");
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
          <Text onClick={logout}>Logout</Text>
        </div>
      </Modal.Body>
    </Modal>
  ) : null;
}
