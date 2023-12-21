import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import theme from "./Components/theme";
import Header from "./Header";
import "@fontsource/pacifico/400.css";
import "@fontsource/sometype-mono/500.css";
import { Helmet } from "react-helmet";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Helmet>
        <style>{"body { background-color: #E1E7CD; }"}</style>
      </Helmet>
      <Header />
      <Outlet />
    </ChakraProvider>
  );
}

export default App;
