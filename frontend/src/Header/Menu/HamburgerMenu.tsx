import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {
  menuItems: any;
};

const purple = "#45446A";
const green = "#E1E7CD";

const HamburgerMenu = ({ menuItems }: Props) => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

  return (
    <Menu>
      <MenuButton
        as={Button}
        aria-label="Options"
        color={green}
        backgroundColor={purple}
        _hover={{
          backgroundColor: `${green}`,
          border: `1px solid ${purple}`,
          color: `${purple}`,
        }}
        _expanded={{
          backgroundColor: `${green}`,
          border: `1px solid ${purple}`,
          color: `${purple}`,
        }}
        px={2}
        py={1}
      >
        <HamburgerIcon boxSize={5} />
      </MenuButton>
      <MenuList backgroundColor={purple}>
        {menuItems.map((item: any) => {
          if (!isLargerThan600) {
            return (
              <Link to={`/${item.path}`}>
                <MenuItem
                  backgroundColor={purple}
                  color={green}
                  _hover={{
                    backgroundColor: `${green}`,
                    color: `${purple}`,
                  }}
                >
                  {item.name}
                </MenuItem>
              </Link>
            );
          } else {
            if (item.name !== "Account Details") {
              return (
                <Link to={`/${item.path}`}>
                  <MenuItem
                    backgroundColor={purple}
                    color={green}
                    _hover={{
                      backgroundColor: `${green}`,
                      color: `${purple}`,
                    }}
                  >
                    {item.name}
                  </MenuItem>
                </Link>
              );
            } else {
              return null;
            }
          }
        })}
      </MenuList>
    </Menu>
  );
};

export default HamburgerMenu;
