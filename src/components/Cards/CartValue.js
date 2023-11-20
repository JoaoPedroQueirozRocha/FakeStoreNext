import { Group, Text, Title } from "@mantine/core";
import { useState, useEffect } from "react"
import { fetchProductById } from "@/server/api/router";


export default function CartValue(){
  const [cardItems, setCardItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [storageChangeCounter, setStorageChangeCounter] = useState(0);

  const calculateTotal = () => {
    const total = cardItems.reduce((acc, product) => {
      const productPrice = product.price || 0;
      const productQuantity = product.quantity;
      return acc + productPrice * productQuantity;
    }, 0);
    setTotalValue(total);
  };

  const handleStorageChange = () => {
    setStorageChangeCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCardItems(storedCartItems);

    const fetchProductsDetails = async () => {
      const details = await Promise.all(
        storedCartItems.map(async (item) => {
          const cartProducts = await fetchProductById(item.id);
          return { ...cartProducts, quantity: item.quantity };
        })
      );
      setCardItems(details);
      console.log("calc"+calculateTotal());
    };
    
    fetchProductsDetails();
  }, [storageChangeCounter]);

  useEffect(() => {

    calculateTotal()
  }, [cardItems]);

  useEffect(() => {
    window.addEventListener("storagechange", handleStorageChange);

    return () => {
      window.removeEventListener("storagechange", handleStorageChange);
    };
  }, []);


    return (
        <Group className="w-full p-2 bg-gray-400 flex flex-row justify-between rounded-t bottom-0">
            <Title order={3} color="black">Total do carrinho</Title>
            <Title order={3} color="black">R${totalValue}</Title>
        </Group>
    )
}