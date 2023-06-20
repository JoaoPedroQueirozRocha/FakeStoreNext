"use client";
import ProductCards from "@/components/Cards/Cards";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Header/Nav";
import {
  callApiProducts,
  getCategories,
  productByCategory,
} from "@/server/api/router";
import { Button, Grid, Loader, Tabs } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  let [activetab, setActiveTab] = useState("todos");
  const stableActivetab = useMemo(() => activetab, [activetab]);
  const [isLoading, setLoading] = useState(true);

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
        })
        .finally(() => {
          setLoading(false);
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

  return isLoading ? (
    <div id="loader">
      <Loader size="xl"></Loader>
    </div>
  ) : (
    <main className="h-screen">
      <Navbar />
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
                  <ProductCards
                    product={{
                      id: product.id,
                      title: product.title,
                      image: product.image,
                      rating: product.rating.rate,
                      price: product.price,
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
