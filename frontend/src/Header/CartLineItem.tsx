import { Box, IconButton } from "@chakra-ui/react";
import { Workshop } from "../Pages/Workshops";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";

type Props = {
  workshop: Workshop;
  updateUser: (newUser: any) => void;
};

const CartLineItem = ({ workshop, updateUser }: Props) => {
  const deleteFromCart = () => {
    const token = window.localStorage.getItem("token");
    axios
      .post(
        "http://localhost:3001/api/auth/delete-workshop-from-cart",
        {
          workshopId: workshop.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const user = response.data;
        updateUser(user);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box>{workshop.name}</Box>
      <IconButton
        aria-label="Delete workshop from cart"
        icon={<DeleteIcon />}
        size="sm"
        onClick={deleteFromCart}
      />
    </Box>
  );
};

export default CartLineItem;
