import { Container, VStack, Text, SimpleGrid, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useProductStore } from '../store/product';
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const {fetchProducts, products} = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log('products', products);

  const filterProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={30}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          >
            Current Products 🚀
        </Text>

        <Input
          placeholder='Search products...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          maxW='md'
          mb={6}
        />

        <SimpleGrid
          columns={{
            base : 1,
            md : 2,
            lg : 3
          }}
          spacing={10}
          w={'full'}
        >
          {filterProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {filterProducts.length == 0 && (
          <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
					No products found 😢{" "}
					<Link to={"/create"}>
						<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
							Create a product
						</Text>
					</Link>
				</Text>
        )};
      </VStack>
    </Container>
  )
};

export default HomePage