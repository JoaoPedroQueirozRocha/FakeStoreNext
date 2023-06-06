"use client";
import { Button, CardSection, Grid, Group, Image, Text } from "@mantine/core";
import { callApiProducts } from "@/server/api/router";
import { useEffect, useState } from "react";
import { Card } from "@mantine/core";

export default function Home() {
  const [products, setProducts] = useState();

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
    <main>
      <div className="flex flex-wrap justify-evenly m-14 gap-10">
        {products
          ? products.map((product) => (
              <Grid grow className="h-90">
                <Grid.Col
                  key={product.id}
                  span="auto"
                  className="flex justify-center flex-wrap  "
                >
                  <div className="flex flex-col justify-between items-center w-40 bg-white p-2">
                    <div className="h-12">
                      <Text color="black" className="text-ellipsis">
                        {product.title}
                      </Text>
                    </div>
                    <Image
                      src={product.image}
                      width={160}
                      height={160}
                      fit="fill"
                    />
                    <Button variant="default" color="black">
                      Mais Detalhes
                    </Button>
                  </div>
                </Grid.Col>
              </Grid>
            ))
          : null}
      </div>
    </main>
  );
}
