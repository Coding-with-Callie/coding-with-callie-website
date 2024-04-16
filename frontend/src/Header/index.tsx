import { Box, Image, Heading, useMediaQuery, Avatar } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Menus from "./Menu";
import Cart from "./Cart";
const sloth = require("../../src/images/sloth.png");

type Props = {
  user: any;
  updateUser: (newUser: any) => void;
  checkoutStep: number;
  updateCheckoutStep: (newStep: number) => void;
};

const Header = ({
  user,
  updateUser,
  checkoutStep,
  updateCheckoutStep,
}: Props) => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const navigate = useNavigate();

  const loggedIn = user?.name !== undefined;

  let tempCart: any = window.localStorage.getItem("temp-cart");
  if (tempCart) {
    tempCart = JSON.parse(tempCart);
  } else {
    tempCart = [];
  }

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
        count={loggedIn ? user?.cart?.workshops.length || 0 : tempCart.length}
        workshops={loggedIn ? user?.cart?.workshops || [] : tempCart}
        updateUser={updateUser}
        userId={loggedIn ? user.id : 0}
        checkoutStep={checkoutStep}
        updateCheckoutStep={updateCheckoutStep}
      />
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
