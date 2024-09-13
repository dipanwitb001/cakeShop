import {React, useEffect} from 'react'
import {Container, VStack, Text, SimpleGrid} from '@chakra-ui/react';
import {Link} from "react-router-dom";
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard'

const HomePage = () => {

  const {fetchProducts, products} = useProductStore();
  useEffect(() => {
      fetchProducts();
  },[fetchProducts]);
  //console.log("products", products);

  return (
   <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
      <Text 
        fontSize={"30"}
        fontWeight={"bold"}
        bgGradient={"linear(to-r,cyan.400,blue.500)"}  
        bgClip={"text"}
        textAlign={"center"}
      >
        Current Products 🚀
      </Text>

      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg: 3
        }}
        spacing={10}
        w={"full"}
      >
        {products.map((product) => ( //The map() function loops over the products array, and for each product, it renders a ProductCard component
          <ProductCard key={product._id} product={product}/>  //for each ProductCard, the key is set to product._id to ensure that React can keep track of which product is which.(in the products array, the entire product objects are stored along with id(provided my database), name, proce and image. from their the product._id is fetched and set as the value of the key)
          //The product object is passed as a prop to provide all the necessary data to the ProductCard component for rendering.
        ))}
      </SimpleGrid>

     {products.length === 0 && (
       <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
       No products found 😢{" "}
       <Link to={"/create"}>
         <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
           Create a product
         </Text>
       </Link>
     </Text>
     )}
      </VStack>
   </Container>
  )
};

export default HomePage

/*
The product._id is accessed directly from the product object that is being iterated over in the map() function. Here’s a detailed breakdown of how the product ID is handled:

Understanding the Flow
Data Source:

The products array is typically fetched from a backend server or API. This data is usually retrieved from a database like MongoDB, which assigns a unique _id to each product document.
Fetching Products:

In your code, fetchProducts() is called inside useEffect to load the products when the component mounts. This function is likely defined in your useProductStore and might make an API call to fetch data from a server.
js
Copy code
const {fetchProducts, products} = useProductStore();
useEffect(() => {
    fetchProducts();
}, [fetchProducts]);
Data Structure:

Once the data is fetched, it’s stored in the products state (or however the useProductStore manages state). Each product in this array would typically include an _id field (if fetched from MongoDB) along with other attributes like name, price, and image.
js
Copy code
const products = [
  {
    _id: '601f191e810c19729de860ea',
    name: 'Laptop',
    price: 1200,
    image: 'https://example.com/laptop.jpg'
  },
  // other products
];
Rendering ProductCard:

When rendering the ProductCard components in your HomePage, you use the map() function to iterate over the products array. Each product object from this array is passed as a prop to the ProductCard component.
js
Copy code
{products.map((product) => (
  <ProductCard key={product._id} product={product} />
))}
Accessing _id:

Inside the ProductCard component, product._id is accessed directly from the product prop. This ID is part of the product object that was passed down from the HomePage component.
js
Copy code
<ProductCard key={product._id} product={product} />
Why the Product ID is Available
Database Documents: If the products are fetched from a database like MongoDB, each product document typically includes a unique _id field. This is a common practice for uniquely identifying documents within a collection.

API Response: The server or API that serves the products usually includes this ID in the response payload. For example:

json
Copy code
[
  {
    "_id": "601f191e810c19729de860ea",
    "name": "Laptop",
    "price": 1200,
    "image": "https://example.com/laptop.jpg"
  },
  // other products
]
State Management: When the data is loaded into state (e.g., through useProductStore), each product object retains the _id property. This ID is then used in your React components.*/
