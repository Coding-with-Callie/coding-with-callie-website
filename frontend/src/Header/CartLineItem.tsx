import { Box, IconButton } from "@chakra-ui/react";
import { Workshop } from "../Pages/Workshops";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { showNotification } from "..";
import { useNavigate } from "react-router-dom";

type Props = {
  workshop: Workshop;
  updateUser: (newUser: any) => void;
  userId: number;
};

const CartLineItem = ({ workshop, updateUser, userId }: Props) => {
  const navigate = useNavigate();

  const deleteFromCart = () => {
    if (userId > 0) {
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
          showNotification(
            "The workshop has been removed from your cart!",
            "success"
          );
        })
        .catch((error) => {
          if (error.response.data.message === "Unauthorized") {
            showNotification(
              "It looks like your session has expired. Please log in again to view Coding with Callie resources!",
              "error"
            );
            navigate("/log-in");
          } else {
            let message: string = error.response.data.message;
            showNotification(`${message}`, "error");
          }
        });
    } else {
      let cart = window.localStorage.getItem("temp-cart");

      if (cart) {
        cart = JSON.parse(cart);
        if (Array.isArray(cart)) {
          const index = cart.indexOf(workshop);
          cart.splice(index, 1);
        }
      }

      window.localStorage.setItem("temp-cart", JSON.stringify(cart));
      updateUser({});
      showNotification(
        "The workshop has been removed from your cart!",
        "success"
      );
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box flex={1}>{workshop.name}</Box>
      <Box px={4}>${workshop.price}.00</Box>
      <IconButton
        aria-label="Delete workshop from cart"
        icon={<DeleteIcon />}
        size="sm"
        onClick={deleteFromCart}
        colorScheme="green"
      />
    </Box>
  );
};

export default CartLineItem;
