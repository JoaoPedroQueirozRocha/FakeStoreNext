/* eslint-disable react-hooks/rules-of-hooks */
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Header/Nav";
import { useEffect, useMemo, useState } from "react";
import "../app/globals.css";
import { Container, Grid, Loader, SimpleGrid, TextInput, Title } from "@mantine/core";
import { fetchProductById } from "@/server/api/router";
import ProductCards from "@/components/Cards/Cards";
import CartCards from "@/components/Cards/CartCards";
import CartValue from "@/components/Cards/CartValue";

export default function bag() {
  const [isLoading, setLoading] = useState(true);
  const [cardItems, setCardItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  
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

  const calculateTotal = () => {
    const total = cardItems.reduce((acc, product) => {
      const productPrice = product.price;
      const productQuantity =  product.quantity
      return acc + productPrice * productQuantity
    }, 0)
    return total
  }

  useEffect(() =>{
    let newTotalValue = calculateTotal();
    setTotalValue(newTotalValue)

  }, [cardItems]);


  return (
    <>
      {isLoading ? (
        <div id="loader">
          <Loader size="xl"></Loader>
        </div>
      ) : (
        <div className="flex flex-col min-w-full">
          <Navbar />
          <main className="min-h-screen">
            <SimpleGrid>
            {cardItems 
            ? ( cardItems.map((product) => {
              return(
              <div
              key={product.id}
              sm={4}
              xs={4}
              className="p-2"
              >
                <CartCards
                  product={{
                    id: product.id,
                    title: product.title,
                    image: product.image,
                    price: product.price,
                  }}
                />
              </div>
              )
                })) : 
            null}
            </SimpleGrid>

          </main>
          <CartValue/>
          <Footer />
        </div>
      )}
    </>
  );
}
