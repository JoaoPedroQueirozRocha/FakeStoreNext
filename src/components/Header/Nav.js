import { Button, Text, Header as Head, Group, Title } from "@mantine/core";
import Link from "next/link";

export default function Navbar() {
  return (
    <Head height={{ base: 70 }} withBorder={true}>
      <div className="flex flex-row align-middle w-full h-full items-center md:pl-12">
        <div className="flex flex-row w-full h-full items-center justify-between">
          <Group>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Title c={"blue"}>Web Store</Title>
            </Link>
          </Group>
        </div>
      </div>
    </Head>
  );
}
