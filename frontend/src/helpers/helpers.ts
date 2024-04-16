import axios from "axios";
import { Workshop } from "../Pages/Workshops";
import { showNotification } from "..";

export const isInvalidName = (name: string) => {
  if (name === "") return true;
  return false;
};

export const isInvalidMessage = (message: string) => {
  if (message === "") return true;
  return false;
};

export const isInvalidEmail = (email: string) => {
  if (email === "" || email.indexOf("@") === -1) return true;
  return false;
};

export const isInvalidComments = (comments: string) => {
  if (comments === "") return true;
  return false;
};

export const transferCart = async (
  cart: Workshop[],
  navigate: (path: string) => void,
  updateUser: (newUser: any) => void,
  onClose?: () => void
) => {
  const token = localStorage.getItem("token");

  for (let i = 0; i < cart.length; i++) {
    const response: any = await axios
      .post(
        `${
          process.env.REACT_APP_API || "http://localhost:3001/api"
        }/auth/add-workshop-to-cart`,
        {
          workshopId: cart[i].id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .catch((error) => {
        showNotification(error.response.data.message, "error");
      });

    updateUser(response.data);

    localStorage.setItem(
      "temp-cart",
      JSON.stringify(response.data.cart.workshops)
    );

    if (response.data.cart.workshops.length === 0) {
      showNotification("You already have access to this workshop", "error");
      navigate("/my-workshops");
      if (onClose) onClose();
    }
  }
};
