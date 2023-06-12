"use client";
import { Badge, Button, Grid, Group, Image, Text } from "@mantine/core";
import { callApiProducts } from "@/server/api/router";
import { useEffect, useState } from "react";
import { Card } from "@mantine/core";
import Navbar from "@/components/Header/Nav";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await callApiProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  console.log(products);

  return (
    <>
      <Navbar />
      <div className="flex flex-wrap justify-between content-center m-14 gap-8">
        <Grid justify="center">
          {products
            ? products.map((product) => (
                <Grid.Col
                  key={product.id}
                  style={{ maxWidth: 250 }}
                  sm={4}
                  xs={4}
                >
                  <Card shadow="sm" padding="lg" radius="md" withBorder height>
                    <Card.Section width="100px" className="flex justify-center">
                      <Image
                        src={product.image}
                        height={160}
                        width={160}
                        className="justify-center"
                        fit="fill"
                        alt=""
                      />
                    </Card.Section>

                    <Group position="apart" mt="md" mb="xs">
                      <Text weight={500} className="h-12 overflow-hidden flex">
                        {product.title}
                      </Text>
                      <Badge color="pink" variant="light">
                        On Sale
                      </Badge>
                    </Group>

                    <Text
                      size="sm"
                      color="dimmed"
                      className="h-36 overflow-x-hidden overflow-y-scroll"
                    >
                      {product.description}
                    </Text>

                    <Link href={`/product/${product.id}`} passHref>
                      <Button
                        fullWidth
                        mt="md"
                        radius="md"
                        variant="filled"
                        className="bg-blue-500"
                      >
                        Mais detalhes
                      </Button>
                    </Link>
                  </Card>
                </Grid.Col>
              ))
            : null}
        </Grid>
      </div>
    </>
  );
}
