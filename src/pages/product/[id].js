import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Header/Nav";
// import { callApiProductId } from "@/server/api/router";
import { Button, Container, Group, Image, Text, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "../../app/globals.css";

export async function getServerSideProps(context) {
  const id = context.params.id;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();
  return { props: { data } };
}

export default function Product({ data }) {
  const router = useRouter();
  const [product, setProduct] = useState();

  const addToCart = () => {
    console.log(product);
  };

  return (
    <>
      <Navbar />
      <div
        className="justify-center w-full h-fit align-middle"
        style={{ display: "flex ", width: "100%", justifyContent: "center" }}
      >
        {data ? (
          <Container w={860} h={450} className="flex bg-white rounded ">
            <div className="flex align-middle">
              <Group noWrap style={{ gap: "10%", padding: "2%" }}>
                <div>
                  <Image
                    src={data.image}
                    height={250}
                    width={190}
                    fit="fill"
                    alt=""
                  />
                </div>
                <div className="flex flex-col h-full justify-evenly">
                  <Title order={3} className="text-black">
                    {data.title}
                  </Title>
                  <Text className="text-black">{data.description}</Text>
                  <div>
                    <Group>
                      <div>
                        <Title order={4} className="text-black">
                          R${data.price}
                        </Title>
                        <Title order={6} className="text-black">
                          Em até 5x de R${(data.price / 5).toFixed(2)}
                        </Title>
                      </div>
                      <div>
                        <Button className="bg-blue-500" onClick={addToCart}>
                          Comprar
                        </Button>
                      </div>
                    </Group>
                  </div>
                </div>
              </Group>
            </div>
          </Container>
        ) : null}
      </div>
      <Footer></Footer>
    </>
  );
}
