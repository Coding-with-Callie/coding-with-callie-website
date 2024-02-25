import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Box } from "@chakra-ui/react";

// This is your test public API key.
const stripePromise = loadStripe(
  "pk_test_51OnUh9GPYyWkM7JWelkGOFu19UKBhHGbvXwwTQS2abJVTpThKH1bmLXJIv0KihGKgIlYML4nJ4uN3vCTQ1ezLre300dL0FTeNA"
);

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:3001/api/auth/create-checkout-session")
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      });
  }, []);

  return (
    <Box m={10}>
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
