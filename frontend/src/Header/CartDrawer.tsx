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
  IconButton,
} from "@chakra-ui/react";
import { Workshop } from "../Pages/Workshops";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import CartLineItem from "./CartLineItem";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  workshops: Workshop[];
  updateUser: (newUser: any) => void;
};

const CartDrawer = ({ isOpen, onClose, workshops, updateUser }: Props) => {
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart</DrawerHeader>

          <DrawerBody>
            {workshops.length > 0 ? (
              <Box display="flex" flexDirection="column" gap={4}>
                {workshops.map((workshop) => {
                  return (
                    <CartLineItem workshop={workshop} updateUser={updateUser} />
                  );
                })}
              </Box>
            ) : (
              <Box>You haven't added any workshops to your cart yet!</Box>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
