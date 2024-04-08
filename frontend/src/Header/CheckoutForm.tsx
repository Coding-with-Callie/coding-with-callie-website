import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { Workshop } from "../Pages/Workshops";

// This is your test public API key.
const stripePromise = loadStripe(
  "pk_test_51OnUh9GPYyWkM7JWelkGOFu19UKBhHGbvXwwTQS2abJVTpThKH1bmLXJIv0KihGKgIlYML4nJ4uN3vCTQ1ezLre300dL0FTeNA"
);

type Props = {
  workshops: Workshop[];
  userId: number;
  updateUser: (newUser: any) => void;
};

const CheckoutForm = ({ workshops, userId, updateUser }: Props) => {
  const [clientSecret, setClientSecret] = useState("");

  const lineItems = workshops.map((workshop) => {
    return { price: workshop.stripeId, quantity: 1 };
  });

  useEffect(() => {
    axios
      .post(
        `${
          process.env.REACT_APP_API || "http://localhost:3001/api"
        }/auth/create-checkout-session`,
        {
          lineItems,
          userId,
        }
      )
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      });
  }, []);

  return (
    <Box>
      <div id="checkout">
        {clientSecret && (
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        )}
      </div>
    </Box>
  );
};

export default CheckoutForm;
