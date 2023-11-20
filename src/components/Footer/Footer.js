import { Text, Title } from "@mantine/core";
import "../../app/globals.css";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col align-middle w-full h-20 justify-center  md:pl-12 bg-blue-500 bottom relative">
      <Title order={2} color="white">Web Store</Title>
      <Text>Created by: João Pedro Queiroz Rocha</Text>
      <Link href={"https://github.com/JoaoPedroQueirozRocha/FakeStoreNext"}>GitHub repository</Link>
    </div>
  );
}
