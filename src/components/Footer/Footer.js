import { Text, Title } from "@mantine/core";
import "../../app/globals.css";

export default function Footer() {
  return (
    <footer
      height={{ base: 70 }}
      className="flex flex-row relative bottom-0 align-middle w-full items-center bg-gray-400 py-4 "
    >
      <div className="container mx-3">
        <Title color="black">Footer</Title>
      </div>
    </footer>
    // <footer height={{ base: 70 }} withBorder={true} className="w-screen">
    //   <div className="flex flex-row relative bottom-0 align-middle w-full h-full items-center md:pl-12 bg-gray-400">
    //     <div className="flex flex-row w-full h-full items-center justify-between">
    //       <Title color="black">Footer</Title>
    //     </div>
    //   </div>
    // </footer>
  );
}
