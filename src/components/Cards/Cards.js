import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Rating,
  Text,
  Title,
} from "@mantine/core";
import { Notifications, notifications } from "@mantine/notifications";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import Link from "next/link";
import "../../app/globals.css";

export default function ProductCards({ product }) {
  const addProduct = (productId) => {
    console.log(productId);
    notifications.show({
      title: "Adicionado ao carrinho",
      messsage: "teste",
      color: "green",
      autoClose: 5000,
      limit: 1,
    });
  };

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder id={product.id}>
        <Card.Section width="100px" className="flex justify-center">
          <Image
            src={product.image}
            height={160}
            width={140}
            className="justify-center m-4"
            fit="fill"
            alt={product.title}
          />
        </Card.Section>

        <div position="center" mt="md" mb="xs">
          <Text weight={500} className="h-12 overflow-hidden flex">
            {product.title}
          </Text>
          <div className="flex flex-col justify-center items-center align-middle m-2">
            <Title order={4}>R${product.price}</Title>
          </div>
        </div>
        <Group position="center">
          <Rating fractions={5} value={product.rating} readOnly />
          <Text size="sm" color="dimmed" className="">
            {product.rating}
          </Text>
        </Group>

        <Group className="flex align-middle mt-4">
          <Link href={`/product/${product.id}`} passHref>
            <Button
              fullWidth
              radius="md"
              variant="filled"
              className="bg-blue-500"
            >
              Mais detalhes
            </Button>
          </Link>
          <ActionIcon
            id={product.id}
            color="blue"
            variant="filled"
            size="lg"
            className="bg-blue-500 rounded"
            onClick={() => {
              addProduct(product.id);
            }}
          >
            <IconShoppingCartPlus size="1.5rem" />
          </ActionIcon>
        </Group>
      </Card>
    </>
  );
}
