"use client";
import {
  Badge,
  Button,
  Grid,
  Group,
  Image,
  Rating,
  Tabs,
  Tab,
  Text,
} from "@mantine/core";
import {
  callApiProducts,
  getCategories,
  productByCategory,
} from "@/server/api/router";
import { useEffect, useState, useMemo } from "react";
import { Card } from "@mantine/core";
import Navbar from "@/components/Header/Nav";
import Link from "next/link";
import ModalPerfil from "@/components/Modal/Modal";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [modalOpen, setOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  let [activetab, setActiveTab] = useState("todos");
  const stableActivetab = useMemo(() => activetab, [activetab]);

  useEffect(() => {
    if (activetab !== "todos") {
      productByCategory(activetab)
        .then((dataByCategory) => {
          setProducts(dataByCategory);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      callApiProducts()
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [stableActivetab]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const dataCategory = await getCategories();
        setCategorias(dataCategory);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategorias();
  }, []);

  const handleClick = () => {
    setOpen(true);
    console.log(modalOpen);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  console.log(activetab);

  return (
    <>
      <Navbar onClick={handleClick} />
      {modalOpen ? <ModalPerfil onClose={handleCloseModal} /> : null}
      <div className="flex flex-wrap content-center m-14 gap-8">
        <div className="flex flex-row w-full" id="tabs">
          <Tabs onTabChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab value="todos">TODOS</Tabs.Tab>
              {categorias
                ? categorias.map((categoria) => (
                    <Tabs.Tab key={categoria} value={categoria}>
                      {categoria.toLocaleUpperCase()}
                    </Tabs.Tab>
                  ))
                : null}
            </Tabs.List>
          </Tabs>
        </div>
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
                        className="justify-center m-4"
                        fit="fill"
                        alt=""
                      />
                    </Card.Section>

                    <Group position="center" mt="md" mb="xs">
                      <Text weight={500} className="h-12 overflow-hidden flex">
                        {product.title}
                      </Text>
                      <Badge color="pink" variant="light">
                        On Sale
                      </Badge>
                    </Group>
                    <Group position="center">
                      <Rating
                        fractions={5}
                        value={product.rating.rate}
                        readOnly
                      />
                      <Text size="sm" color="dimmed" className="">
                        {product.rating.rate}
                      </Text>
                    </Group>

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
      <Footer />
    </>
  );
}
