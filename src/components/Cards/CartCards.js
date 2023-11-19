import { Container, Group, Image, Text } from "@mantine/core";



export default function CartCards({product}){




    return (
        <>
        <div className="flex flex-row">

            <div>
                <Image
                src={product.image}
                height={20}
                width={20}
                alt={product.title}
                />
            </div>
            <Container>
                <Text>{product.title}</Text>
            </Container>

        </div>

        </>
    )
}