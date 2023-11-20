import { Text, Title } from "@mantine/core";
import { useState, useEffect } from "react"
import { fetchProductById } from "@/server/api/router";


export default function CartValue(){
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
  }, []);

  console.log("soma",cardItems);

    const calculateTotal = () => {
        const total = cardItems.reduce((acc, product) => {
            const productPrice = product.price;
            const productQuantity = product.quantity;
            return acc + productPrice * productQuantity;
        }, 0);
        return parseFloat(total.toFixed(2));
    };

  useEffect(() => {
    const newTotalValue = calculateTotal();
    setTotalValue(newTotalValue);
  }, [cardItems]);
    


    return (
        <div>
            <Title order={3} color="black">Total do carrinho: R${totalValue}</Title>
        </div>
    )
}