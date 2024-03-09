import { Box, useDisclosure } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import CartDrawer from "./CartDrawer";
import React from "react";
import { Workshop } from "../Pages/Workshops";

type Props = {
  count: number;
  workshops: Workshop[];
};

const Cart = ({ count, workshops }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        position={count !== 0 ? "relative" : "inherit"}
        top="-10px"
        onClick={onOpen}
        _hover={{ cursor: "pointer" }}
      >
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
      <CartDrawer isOpen={isOpen} onClose={onClose} workshops={workshops} />
    </>
  );
};

export default Cart;
