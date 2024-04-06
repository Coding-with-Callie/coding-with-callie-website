import { ChakraProvider } from "@chakra-ui/react";
import { Outlet, useLoaderData } from "react-router-dom";
import theme from "./Components/theme";
import Header from "./Header";
import "@fontsource/pacifico/400.css";
import "@fontsource/sometype-mono/500.css";
import { Helmet } from "react-helmet";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

export type Context = {
  user: any;
  updateUser: (newUser: any) => void;
  checkoutStep: number;
  updateCheckoutStep: (newStep: number) => void;
};

function App() {
  const data = useLoaderData();
  const [user, setUser] = useState<any>(data);
  const [checkoutStep, setCheckoutStep] = useState(0);

  const updateUser = (newUser: any) => {
    setUser(newUser);
  };

  const updateCheckoutStep = (newStep: number) => {
    setCheckoutStep(newStep);
  };

  const context: Context = {
    user,
    updateUser,
    checkoutStep,
    updateCheckoutStep,
  };

  return (
    <ChakraProvider theme={theme}>
      <Helmet>
        <style>{"body { background-color: #E1E7CD; }"}</style>
      </Helmet>
      <Header
        user={user}
        updateUser={updateUser}
        checkoutStep={checkoutStep}
        updateCheckoutStep={updateCheckoutStep}
      />
      <Outlet context={context} />
    </ChakraProvider>
  );
}

export default App;
