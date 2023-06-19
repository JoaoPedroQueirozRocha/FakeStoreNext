import {
  Card,
  Image,
  Group,
  Text,
  Badge,
  Rating,
  Button,
  ActionIcon,
} from "@mantine/core";
import Link from "next/link";
import "../../app/globals.css";
import { IconShoppingCart } from "@tabler/icons-react";

export default function ProductCards({ product }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder height>
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

      <Group position="center" mt="md" mb="xs">
        <Text weight={500} className="h-12 overflow-hidden flex">
          {product.title}
        </Text>
        <Badge color="pink" variant="light">
          On Sale
        </Badge>
      </Group>
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
            // mt="md"
            radius="md"
            variant="filled"
            className="bg-blue-500"
          >
            Mais detalhes
          </Button>
        </Link>
        <ActionIcon
          color="blue"
          variant="filled"
          size="lg"
          className="bg-blue-500 rounded"
        >
          <IconShoppingCart size="1.5rem" />
        </ActionIcon>
      </Group>
    </Card>
  );
}
