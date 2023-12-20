import { ChakraProvider, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import theme from "./Components/theme";
import Header from "./Header";
import "@fontsource/pacifico/400.css";
import "@fontsource/sometype-mono/500.css";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box backgroundColor="#E1E7CD" h="100vh">
        <Header />
        <Outlet />
      </Box>
    </ChakraProvider>
  );
}

export default App;
