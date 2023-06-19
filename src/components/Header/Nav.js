import {
  Button,
  Text,
  Header as Head,
  Group,
  Title,
  Avatar,
} from "@mantine/core";
import Link from "next/link";
import {
  IconUser,
  IconDotsVertical,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useState } from "react";

export default function Navbar(props) {
  const handleClick = () => {
    props.onClick();
  };

  return (
    <Head height={{ base: 70 }} withBorder={true}>
      <div className="flex flex-row align-middle w-full h-full items-center md:pl-12">
        <div className="flex flex-row w-full h-full items-center justify-between">
          <Group>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Title c={"blue"}>Web Store</Title>
            </Link>
          </Group>
          <Group mr={20}>
            <Avatar radius="xl" color="cyan" onClick={handleClick}>
              <IconUser />
            </Avatar>
            <Link href="/bag">
              <IconShoppingCart color="black"></IconShoppingCart>
            </Link>
          </Group>
        </div>
      </div>
    </Head>
  );
}
