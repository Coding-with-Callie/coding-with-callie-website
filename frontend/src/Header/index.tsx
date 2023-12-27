import { Box, Image, Heading, useMediaQuery, Avatar } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Menus from "./Menu";
const sloth = require("../../src/images/sloth.png");

type Props = {
  user: any;
};

const Header = ({ user }: Props) => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const navigate = useNavigate();

  return (
    <Box
      py={4}
      px={isLargerThan600 ? 8 : 4}
      display="flex"
      alignItems="center"
      gap={4}
    >
      <Box flex={1}>
        <Link to="/">
          <Box display="flex" gap={isLargerThan600 ? 4 : 2} alignItems="center">
            <Image
              src={sloth}
              borderRadius="50%"
              h={isLargerThan600 ? "80px" : "50px"}
              boxShadow="lg"
            />
            <Heading fontSize={isLargerThan600 ? 36 : 24} color="#79A9CD">
              Coding with Callie
            </Heading>
          </Box>
        </Link>
      </Box>
      <Menus user={user} />
      {user?.name ? (
        <Avatar
          name={user.username}
          _hover={{ cursor: "pointer" }}
          onClick={() => navigate("/profile")}
          display={isLargerThan600 ? "flex" : "none"}
        />
      ) : null}
    </Box>
  );
};

export default Header;
