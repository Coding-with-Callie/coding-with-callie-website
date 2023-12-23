import { ChakraProvider } from "@chakra-ui/react";
import { Outlet, useLoaderData } from "react-router-dom";
import theme from "./Components/theme";
import Header from "./Header";
import "@fontsource/pacifico/400.css";
import "@fontsource/sometype-mono/500.css";
import { Helmet } from "react-helmet";
import { useState } from "react";

export type Context = {
  user: any;
  updateUser: (newUser: any) => void;
};

function App() {
  console.log("REACT APP API: ", process.env.REACT_APP_API);
  const data = useLoaderData();
  const [user, setUser] = useState<any>(data);

  const updateUser = (newUser: any) => {
    setUser(newUser);
  };

  const context: Context = {
    user,
    updateUser,
  };

  return (
    <ChakraProvider theme={theme}>
      <Helmet>
        <style>{"body { background-color: #E1E7CD; }"}</style>
      </Helmet>
      <Header user={user} updateUser={updateUser} />
      <Outlet context={context} />
    </ChakraProvider>
  );
}

export default App;
