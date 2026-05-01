import { Container, VStack, Text, SimpleGrid, Input, Button, HStack, Select, Switch, FormControl, FormLabel, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useProductStore } from '../store/product';
import ProductCard from "../components/ProductCard";
import { use } from 'react';

const HomePage = () => {
  const { products, fetchProducts, hasMore } = useProductStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('newest');
  const [onlyStock, setOnlyStock] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts({
        page,
        search: searchTerm,
        sort,
        minPrice,
        maxPrice,
        onlyStock
      });
    }, 500);

    return () => clearTimeout(timer);
      }, [page, searchTerm, sort, minPrice, maxPrice, onlyStock, fetchProducts]);

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      setPage(1); // Reset to first page on new search
    };

    const handleSortChange = (e) => {
      setSort(e.target.value);
      setPage(1); // Reset
    };

    const handleStockToggle = (e) => {
      setOnlyStock(e.target.checked);
      setPage(1);
    }

    return (
      <Container maxW='container.xl' py={12}>
        <VStack spacing={8}>
          <Text
            fontSize={{ base: '2xl', md: '4xl' }}
            fontWeight="extrabold"
            textAlign="center"
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
          >
            Current Products
          </Text>

          <Flex
            w={'full'} 
            gap={4}
            wrap={'wrap'}
            bg='whiteAlpha.100'
            backdropFilter='blur(10px)'
            border='1px solid'
            borderColor='whiteAlpha.200'
            p={5} 
            borderRadius='xl' 
            alignItems='center'
            boxShadow='lg'
          >
            <Input
              placeholder='Search products...'
              value={searchTerm}
              onChange={handleSearchChange}
              flex={2}
              minW='200px'
            />

            <Select value={sort} onChange={handleSortChange} flex={1} minW='150px'>
              <option value='newest'>Newest</option>
              <option value='priceAsc'>Price: Low to High</option>
              <option value='priceDesc'>Price: High to Low</option>
            </Select>

            <HStack flex={1} minW='200px'>
              <Input
                placeholder='Min Price'
                type='number'
                value={minPrice}
                onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
              />
              <Text>-</Text>
              <Input
                placeholder='Max Price'
                type='number'
                value={maxPrice}
                onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
              />
            </HStack>

            <FormControl display='flex' alignItems='center' flex={1} minW='150px'>
              <FormLabel htmlFor='stock-toggle' mb='0' marginInlineEnd={3}>
                Only show in-stock
              </FormLabel>
              <Switch id='stock-alerts' isChecked={onlyStock} onChange={handleStockToggle} />
            </FormControl>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={'full'}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
          {hasMore && products.length > 0 && (
            <Button mt={8} colorScheme='blue' onClick={() => setPage(page + 1)}>
              Load More
            </Button>
          )}
          {!hasMore && products.length > 0 && (
            <Text color='gray.500' mt={8}>
              You've reached the end of the list.
            </Text>
          )}
        </VStack>
      </Container>
    );

  useEffect(() => {
    fetchProducts(page, searchTerm);
  }, [page, searchTerm, fetchProducts]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on new search
  };

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
          onChange={handleSearch}
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
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {hasMore && ( products.length > 0) && (
          <Button
            mt={8}
            colorScheme='cyan'
            onClick={() => setPage(page + 1)}
          >
            Load More
          </Button>
        )}

        {!hasMore && products.length > 0 && (
          <Text fontSize='lg' color='gray.500'>
            You've reached the end of the list.
          </Text>
        )}

        {products.length == 0 && (
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