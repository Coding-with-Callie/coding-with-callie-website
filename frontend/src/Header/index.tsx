import { Box, Text, Image, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Menus from "./Menu";
const sloth = require("../../src/images/sloth.png");

const Header = () => {
  return (
    <Box py={4} px={8} display="flex" alignItems="center">
      <Box flex={1}>
        <Link to="/">
          <Box display="flex" gap={4} alignItems="center">
            <Image src={sloth} borderRadius="50%" h="80px" boxShadow="lg" />
            <Heading fontSize={36} color="#79A9CD">
              Coding with Callie
            </Heading>
          </Box>
        </Link>
      </Box>
      <Menus />
    </Box>
  );
};

export default Header;
