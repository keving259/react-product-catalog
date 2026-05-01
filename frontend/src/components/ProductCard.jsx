import { DeleteIcon, EditIcon, Badge } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorMode,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({product}) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);

    const textColor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue('white', 'gray.800');

    const {deleteProduct, updateProduct} = useProductStore();
    const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid);
        if(!success) {
            toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
        } else {
            toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
            });
        }
    };

	const handleUpdateProduct = async (pid, updatedProduct) => {
		const {success, message} = await updateProduct(pid, updatedProduct);
		onClose();
		if(!success){
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};


    return (
        <Box 
            shadow='lg'
			rounded='lg'
			overflow='hidden'
			_hover={{
				transform: "translateY(-5px)",
				boxShadow: "2xl",
				shadow: "xl",
				borderColor: "cyan.400",
			}}
			bg={bg}
			borderRadius='2xl'
			transition='all 0.3s ease'
        >

            <Image 
				src={product.image}
				alt={product.name}
				h={48} w='full'
				objectFit='cover'
				filter={product.stock === 0 ? 'grayscale(100%) opacity(70%)' : 'none'}
			/>

            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					${product.price}
				</Text>

				<Box mb={4}>
					{product.stock > 0 ? (
						<Badge colorScheme='green' fontSize='0.8em' px={2} py={1} borderRadius='md'>
							In Stock: {product.stock}
						</Badge>
					) : (
						<Badge colorScheme='red' fontSize='0.8em' px={2} py={1} borderRadius='md'>Out of Stock</Badge>
					)}
				</Box>

                <HStack spacing={2}>
					<IconButton icon={<EditIcon />}
						onClick={onOpen}
						colorScheme="cyan" />
					<IconButton
						icon={<DeleteIcon />}
						onClick={() => handleDeleteProduct(product._id)}
						colorScheme='red'
					/>
				</HStack>
            </Box>
			
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

					<ModalContent>
						<ModalHeader>Update Product</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<VStack spacing={4}>
								<Input placeholder="Product Name" name='name' 
									value={updatedProduct.name}
									onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
								/>
								<Input placeholder="Price" name='price' type="number" 
									value={updatedProduct.price}
									onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
								/>
								<Input placeholder="Image URL" name='image' 
									value={updatedProduct.image}
									onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
								/>
								<Input placeholder="Stock" name='stock' type="number"
									value={updatedProduct.stock}
									onChange={(e) => setUpdatedProduct({ ...updatedProduct, stock: Number(e.target.value) })}
								/>
							</VStack>
						</ModalBody>

						<ModalFooter>
						<Button
							colorScheme='cyan'
							mr={3}
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>

					</ModalContent>
			</Modal>
        </Box>
    )
};

export default ProductCard