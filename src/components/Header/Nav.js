import { Avatar, Group, Header as Head, Title } from "@mantine/core";
import { IconShoppingCart, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ModalPerfil from "../Modal/Modal";
import { useRouter } from "next/navigation";
export default function Navbar(props) {
  const router = useRouter();
  const [loged, setLoged] = useState(false);
  const [modalOpen, setOpen] = useState(false);

  //modal
  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem("userKey"));
    if (userId) {
      setLoged(true);
    }
    userId = localStorage.getItem("userKey");
    userId ? setLoged(true) : setLoged(false);
  }, []);

  const handleClickModal = () => {
    loged ? setOpen(true) : router.push("/Signup");
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Head height={{ base: 70 }} withBorder={true}>
        <div className="flex flex-row align-middle w-full h-full items-center md:pl-12">
          <div className="flex flex-row w-full h-full items-center justify-between">
            <Group>
              <Link href="/" style={{ textDecoration: "none" }}>
                <Title c={"blue"}>Web Store</Title>
              </Link>
            </Group>
            <Group mr={20}>
              <Avatar radius="xl" color="cyan" onClick={handleClickModal}>
                <IconUser />
              </Avatar>
              <Link href="/bag">
                <IconShoppingCart color="black"></IconShoppingCart>
              </Link>
            </Group>
          </div>
        </div>
      </Head>
      {modalOpen ? <ModalPerfil onClose={handleCloseModal} /> : null}
    </>
  );
}
