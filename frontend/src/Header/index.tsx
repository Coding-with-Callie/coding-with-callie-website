import { Box, Image, Heading, useMediaQuery, Avatar } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Menus from "./Menu";
import { contentBackground } from "../Components/theme";
const sloth = require("../../src/images/sloth.png");

type Props = {
  user: any;
  updateUser: (newUser: any) => void;
};

const Header = ({ user, updateUser }: Props) => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const navigate = useNavigate();

  const loggedIn = user?.name !== undefined;

  return (
    <Box
      py={2}
      px={isLargerThan600 ? 8 : 4}
      display="flex"
      alignItems="center"
      gap={4}
      backgroundColor={contentBackground}
      boxShadow="lg"
      position="sticky"
      top={0}
      zIndex={1000}
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
            <Heading fontSize={isLargerThan600 ? 36 : 24}>
              Coding with Callie
            </Heading>
          </Box>
        </Link>
      </Box>
      <Menus user={user} updateUser={updateUser} />

      {loggedIn ? (
        <Avatar
          name={user.username}
          src={user.photo}
          _hover={{ cursor: "pointer" }}
          onClick={() => navigate("/profile")}
          display={isLargerThan600 ? "flex" : "none"}
        />
      ) : null}
    </Box>
  );
};

export default Header;
