import { ChakraProvider } from "@chakra-ui/react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import theme from "./Components/theme";
import Header from "./Header";
import "@fontsource/pacifico/400.css";
import "@fontsource/sometype-mono/500.css";
import { Helmet } from "react-helmet";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { showNotification } from ".";

export type Context = {
  user: any;
  updateUser: (newUser: any) => void;
  catchError: (error: CustomError) => void;
};

export type CustomError = {
  message: string;
  path?: string;
};

function App() {
  const data = useLoaderData();
  const [user, setUser] = useState<any>(data);

  const updateUser = (newUser: any) => {
    setUser(newUser);
  };

  const navigate = useNavigate();

  const catchError = (error: CustomError) => {
    showNotification(error.message, "error");

    if (error.path) {
      navigate(error.path);
    }
  };

  const context: Context = {
    user,
    updateUser,
    catchError,
  };

  return (
    <ChakraProvider theme={theme}>
      <Helmet>
        <style>{"body { background-color: #f9eff4; }"}</style>
      </Helmet>
      <Header user={user} updateUser={updateUser} />
      <Outlet context={context} />
    </ChakraProvider>
  );
}

export default App;
