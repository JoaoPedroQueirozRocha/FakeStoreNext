import { Container, Group, Image, NumberInput, Text, Title } from "@mantine/core";
import { useState } from "react";



export default function CartCards({product}){

    const productsInCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const quantity = () => {
        const findProductInCart = productsInCart.findIndex((item) => item.id === product.id)

        return productsInCart[findProductInCart].quantity;
    }

    const [quantityInCart, setQuantityInCart] = useState(quantity(product))

    const totalPrice = () => {
        const productPrice = product.price;

        return productPrice * quantityInCart;
    }

    const handleQuantityChange = (newQuantity) => {
        setQuantityInCart(newQuantity)
        const findProductInCart = productsInCart.findIndex((item) => item.id === product.id)
        
        if(findProductInCart !== -1){
            productsInCart[findProductInCart].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(productsInCart));
        
            const storageChangeEvent = new Event('storagechange');
            window.dispatchEvent(storageChangeEvent);
        
        }
    }
    

    return (
        <div className="flex flex-row bg-cyan-700 justify-between items-center p-2 rounded">
            <Group>
                <Image
                src={product.image}
                height={100}
                width={100}
                alt={product.title}
                fit="fill"
                radius="sm"
                />
                <Container className="flex flex-col justify-between">
                        <Title order={2} className="overflow-hidden ">{product.title}</Title>
                        <Text size="lg">R${product.price}</Text>
                </Container>
            </Group>
            <div className="flex flex-col self-center">
                <NumberInput
                label="Quantidade"
                prefix="$"
                defaultValue={quantityInCart}
                onChange={handleQuantityChange}
                mb="md"
                />
                <Text>Total: R${totalPrice()}</Text>
            </div>


        </div>

    )
}