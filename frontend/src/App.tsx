import { Box, ChakraProvider } from "@chakra-ui/react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import theme, { mainBackground } from "./Components/theme";
import Header from "./Header";
import "@fontsource/pacifico/400.css";
import "@fontsource/sometype-mono/500.css";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { showNotification } from ".";
import Footer from "./Components/Footer/Footer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
      <DndProvider backend={HTML5Backend}>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Header user={user} updateUser={updateUser} />
          <Box flex={1} pb={20} backgroundColor={mainBackground}>
            <Outlet context={context} />
          </Box>
          <Footer />
        </Box>
      </DndProvider>
    </ChakraProvider>
  );
}

export default App;
