import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Menus from "./Menu";

const Header = () => {
  return (
    <Box p={4} display="flex">
      <Box flex={1}>
        {" "}
        <Link to="/">
          <Text fontSize={30}>Coding with Callie</Text>{" "}
        </Link>
      </Box>

      <Menus />
    </Box>
  );
};

export default Header;
