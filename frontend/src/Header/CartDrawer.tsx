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
import React from "react";
import { Workshop } from "../Pages/Workshops";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  workshops: Workshop[];
};

const CartDrawer = ({ isOpen, onClose, workshops }: Props) => {
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart</DrawerHeader>

          <DrawerBody>
            {workshops.map((workshop) => {
              return <Box>{workshop.name}</Box>;
            })}
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
