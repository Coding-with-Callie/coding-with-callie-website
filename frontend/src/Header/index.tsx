import { Box, Image, Heading, useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Menus from "./Menu";
const sloth = require("../../src/images/sloth.png");

const Header = () => {
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");

  return (
    <Box py={4} px={8} display="flex" alignItems="center">
      <Box flex={1}>
        <Link to="/">
          <Box display="flex" gap={isLargerThan500 ? 4 : 2} alignItems="center">
            <Image
              src={sloth}
              borderRadius="50%"
              h={isLargerThan500 ? "80px" : "50px"}
              boxShadow="lg"
            />
            <Heading fontSize={isLargerThan500 ? 36 : 25} color="#79A9CD">
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
