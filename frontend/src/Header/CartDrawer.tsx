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
import CartLogin from "./CartLogIn";
import BodyHeading from "../Components/BodyHeading";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  workshops: Workshop[];
  updateUser: (newUser: any) => void;
  userId: number;
};

const getTotalPrice = (workshops: Workshop[]) => {
  if (workshops.length) {
    return workshops.reduce(
      (accumlator, currentValue) => accumlator + currentValue.price,
      0
    );
  } else {
    return 0;
  }
};

const CartDrawer = ({
  isOpen,
  onClose,
  workshops,
  updateUser,
  userId,
}: Props) => {
  const [checkoutStep, setCheckoutStep] = useState(0);

  if (typeof workshops === "string") {
    workshops = JSON.parse(workshops);
  }

  const totalPrice = getTotalPrice(workshops);

  const hasAccount = window.localStorage.getItem("token") !== undefined;

  const startCheckout = () => {
    if (userId > 0) {
      setCheckoutStep(2);
    } else {
      setCheckoutStep(1);
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay />
        {checkoutStep === 0 ? (
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
            {workshops.length > 0 ? (
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
            ) : null}
          </DrawerContent>
        ) : checkoutStep === 1 ? (
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <BodyHeading textAlignCenter={false}>Cart</BodyHeading>
            </DrawerHeader>
            <DrawerBody>
              {hasAccount ? (
                <CartLogin
                  updateUser={updateUser}
                  setCheckoutStep={setCheckoutStep}
                  onClose={onClose}
                />
              ) : (
                <Box>
                  You must create an account to complete the checkout process!
                </Box>
              )}
            </DrawerBody>
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
