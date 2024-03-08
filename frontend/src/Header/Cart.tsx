import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const [count, setCount] = useState(0);
  return (
    <Box position={count !== 0 ? "relative" : "inherit"} top="-10px">
      {count !== 0 && (
        <Box
          border="1px solid #45446A"
          borderRadius="50%"
          textAlign="center"
          w="20px"
          position="relative"
          top="16px"
          left="30px"
          backgroundColor="white"
          color="#45446A"
          fontSize={12}
        >
          {count}
        </Box>
      )}
      <FaShoppingCart size="40px" color="#45446A" />
    </Box>
  );
};

export default Cart;
