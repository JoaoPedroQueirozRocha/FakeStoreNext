/* eslint-disable react-hooks/rules-of-hooks */
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Header/Nav";
import { useEffect, useMemo, useState } from "react";
import "../app/globals.css";
import { Grid, Loader } from "@mantine/core";
import { fetchProductById } from "@/server/api/router";
import ProductCards from "@/components/Cards/Cards";

export default function bag() {
  const [isLoading, setLoading] = useState(true);
  const [cardItems, setCardItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCardItems(storedCartItems);

    const fetchProductsDetails = async () =>{
      const details = await Promise.all(
        storedCartItems.map(async (item) => {
          const cartProducts = await fetchProductById(item.id);
          return {...cartProducts, quantity: item.quantity};
        })
      )
      setCardItems(details);
    }
    fetchProductsDetails();
    setLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div id="loader">
          <Loader size="xl"></Loader>
        </div>
      ) : (
        <div className="flex flex-col h-screen">
          <Navbar />
          <main className="overflow-auto h-screen">
            <Grid>
            {cardItems 
            ? ( cardItems.map((product) => {
              console.log("Product:", product)
              return(
              <Grid.Col
              key={product.id}
              style={{maxWidth: 250}}
              sm={4}
              xs={4}
              >
                <ProductCards
                  product={{
                    id: product.id,
                    title: product.title,
                    image: product.image,
                    // rating: product.rating.rate,
                    price: product.price,
                  }}
                />
              </Grid.Col>
              )
                })) : 
            null}
            </Grid>
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
