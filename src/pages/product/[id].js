import Navbar from "@/components/Header/Nav";
import { callApiProductId } from "@/server/api/router";
import {
  Card,
  CardSection,
  Container,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "../../app/globals.css";

export default function Product() {
  const router = useRouter();
  const id = router.query.id;
  const [product, setProduct] = useState();

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const data = await callApiProductId(id);
    //     setProduct(data);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };
    // fetchData();
    callApiProductId(id)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <>
      <Navbar />
      <div
        className="justify-center w-full h-full align-middle"
        style={{ display: "flex ", width: "100%", justifyContent: "center" }}
      >
        {product ? (
          <Container w={860} h={450} className="flex bg-white">
            <div className="flex align-middle">
              <Group noWrap>
                <div>
                  <Image src={product.image} height={160} width={160} alt="" />
                </div>
                <div className="flex flex-col justify-evenly">
                  <Title order={3} className="text-black">
                    {product.title}
                  </Title>
                  <Text className="text-black">{product.description}</Text>
                  <div>
                    <Title order={4} className="text-black">
                      R${product.price}
                    </Title>
                    <Title order={6} className="text-black">
                      Em até 5x de {(product.price / 5).toFixed(2)}
                    </Title>
                  </div>
                </div>
                s
              </Group>
            </div>
          </Container>
        ) : null}
      </div>
    </>
  );
}
