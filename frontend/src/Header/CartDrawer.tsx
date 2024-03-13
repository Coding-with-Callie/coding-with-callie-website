import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Box,
} from "@chakra-ui/react";
import { Workshop } from "../Pages/Workshops";
import CartLineItem from "./CartLineItem";
import { useState } from "react";
import CheckoutForm from "./CheckoutForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  workshops: Workshop[];
  updateUser: (newUser: any) => void;
  userId: number;
};

const CartDrawer = ({
  isOpen,
  onClose,
  workshops,
  updateUser,
  userId,
}: Props) => {
  const [checkout, setCheckout] = useState(false);

  const totalPrice = workshops.reduce(
    (accumlator, currentValue) => accumlator + currentValue.price,
    0
  );

  const startCheckout = () => {
    setCheckout(true);
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay />
        {!checkout ? (
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Cart</DrawerHeader>

            <DrawerBody>
              {workshops.length > 0 ? (
                <Box display="flex" flexDirection="column" gap={4}>
                  {workshops.map((workshop) => {
                    return (
                      <CartLineItem
                        workshop={workshop}
                        updateUser={updateUser}
                        userId={userId}
                      />
                    );
                  })}
                </Box>
              ) : (
                <Box>You haven't added any workshops to your cart yet!</Box>
              )}
            </DrawerBody>

            <DrawerFooter>
              <Box w="100%">
                <Box display="flex" justifyContent="flex-end" mb={4}>
                  <Box w="50%">Total:</Box>
                  <Box>${totalPrice}.00</Box>
                </Box>
                <Button colorScheme="green" w="100%" onClick={startCheckout}>
                  Checkout
                </Button>
              </Box>
            </DrawerFooter>
          </DrawerContent>
        ) : (
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <CheckoutForm
                workshops={workshops}
                userId={userId}
                updateUser={updateUser}
              />
            </DrawerBody>
          </DrawerContent>
        )}
      </Drawer>
    </>
  );
};

export default CartDrawer;
