"use client";
import ProductCards from "@/components/Cards/Cards";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Header/Nav";
import ModalPerfil from "@/components/Modal/Modal";
import {
  callApiProducts,
  getCategories,
  productByCategory,
} from "@/server/api/router";
import { Button, Grid, Tabs } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Router } from "next/router";

export default function Home() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [modalOpen, setOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  let [activetab, setActiveTab] = useState("todos");
  const [loged, setLoged] = useState(false);
  const stableActivetab = useMemo(() => activetab, [activetab]);
  let userId;

  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem("userId"));
    if (userId) {
      setLoged(true);
    }
  }, []);

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

    userId = localStorage.getItem("userId");
    userId ? setLoged(true) : setLoged(false);
  }, []);

  const handleClick = () => {
    loged ? setOpen(true) : router.push("/Signup");
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <main className="h-screen">
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
          <Button
            onClick={() => {
              notifications.show({
                title: "teste",
                message: "teste",
              });
            }}
          ></Button>
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
                  <ProductCards
                    product={{
                      id: product.id,
                      title: product.title,
                      image: product.image,
                      rating: product.rating.rate,
                    }}
                  />
                </Grid.Col>
              ))
            : null}
        </Grid>
      </div>
      <Footer />
    </main>
  );
}
