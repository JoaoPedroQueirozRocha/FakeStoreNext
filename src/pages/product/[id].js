import Navbar from "@/components/Header/Nav";
import { callApiProductId } from "@/server/api/router";
import { Card, CardSection, Group, Image, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Product() {
  const router = useRouter();
  const id = router.query.id;
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await callApiProductId(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  console.log("product", product);

  return (
    <>
      <Navbar />
      <div
        className="justify-center w-full h-full"
        style={{ display: "flex", width: "100%", justifyContent: "center" }}
      >
        {product ? (
          <Card w={460} className="flex">
            <CardSection>
              <Group noWrap>
                <div>
                  <Text>{product.title}</Text>
                  <Image src={product.image} height={160} width={160} alt="" />
                </div>
                <div>
                  <Text>{product.description}</Text>
                </div>
              </Group>
            </CardSection>
          </Card>
        ) : null}
      </div>
    </>
  );
}
