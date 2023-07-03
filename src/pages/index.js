"use client";
import dynamic from "next/dynamic";
import ProductCards from "@/components/Cards/Cards";
// import Footer from "@/components/Footer/Footer";
// import Navbar from "@/components/Header/Nav";
import { callApiProducts, productByCategory } from "@/server/api/router";
import { Grid, Loader, Tabs } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useEffect, useMemo, useState } from "react";

const Footer = dynamic(() => import("@/components/Footer/Footer"), {
  ssr: false,
});
const Navbar = dynamic(() => import("@/components/Header/Nav"), { ssr: false });
// const ProductCards = dynamic(() => import("@/components/Cards/Cards"), {
//   ssr: false,
// });

export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const data = await res.json();
  const dataCategorias = Object.values(data);
  return { props: { dataCategorias } };
}

export default function Home({ dataCategorias }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  let [activetab, setActiveTab] = useState(null);
  const stableActivetab = useMemo(() => activetab, [activetab]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    callApiProducts()
      .then((data) => {
        console.log("dados", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (activetab !== "todos" && activetab !== null) {
      const filtered = products.filter(
        (product) => product.category === activetab
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [stableActivetab, products]);

  return isLoading ? (
    <div
      id="loader"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Loader size="xl"></Loader>
    </div>
  ) : (
    <main className="min-h-screen flex flex-col ">
      <Navbar />
      <Notifications limit={1} />
      <div className="flex flex-wrap content-center m-14 gap-8">
        <div className="flex flex-row w-full" id="tabs">
          <Tabs onTabChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab value="todos">TODOS</Tabs.Tab>
              {dataCategorias
                ? dataCategorias.map((categoria) => (
                    <Tabs.Tab key={categoria} value={categoria}>
                      {categoria.toLocaleUpperCase()}
                    </Tabs.Tab>
                  ))
                : null}
            </Tabs.List>
          </Tabs>
        </div>
        <Grid justify="center" style={{ width: "100%" }}>
          {filteredProducts
            ? filteredProducts.map((product) => (
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
