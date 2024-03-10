import { Box, Image, Heading, useMediaQuery, Avatar } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Menus from "./Menu";
import Cart from "./Cart";
import { useEffect, useState } from "react";
const sloth = require("../../src/images/sloth.png");

type Props = {
  user: any;
  updateUser: (newUser: any) => void;
};

const Header = ({ user, updateUser }: Props) => {
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
      <Cart
        count={user?.cart?.workshops.length || 0}
        workshops={user?.cart?.workshops}
        updateUser={updateUser}
      />
      {user?.name ? (
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
