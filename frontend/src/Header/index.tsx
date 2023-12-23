import { Box, Image, Heading, useMediaQuery, Avatar } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Menus from "./Menu";
const sloth = require("../../src/images/sloth.png");

type Props = {
  user: any;
  updateUser: (user: any) => void;
};

const Header = ({ user, updateUser }: Props) => {
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    const newUser = {};
    updateUser(newUser);
    navigate("/log-in");
  };

  return (
    <Box py={4} px={8} display="flex" alignItems="center" gap={4}>
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
      {user?.name ? <Avatar name={user.username} onClick={logout} /> : null}
    </Box>
  );
};

export default Header;
