import { Text, Title } from "@mantine/core";
import "../../app/globals.css";

export default function Footer() {
  return (
    // <footer className="flex flex-row relative bottom-0 align-middle w-full items-center md:pl-12 bg-gray-400 py-4 ">
    //   <div className="container mx-auto">
    //     <Title color="black">Footer</Title>
    //   </div>
    // </footer>
    <footer height={{ base: 70 }} withBorder={true}>
      <div className="flex flex-row relative bottom-0 align-middle w-full h-full items-center md:pl-12 bg-gray-400">
        <div className="flex flex-row w-full h-full items-center justify-between">
          <Title color="black">Footer</Title>
        </div>
      </div>
    </footer>
  );
}
