import { HamburgerIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {
  menuItems: any;
};

const purple = "#45446A";
const green = "#E1E7CD";

const HamburgerMenu = ({ menuItems }: Props) => {
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
        })}
      </MenuList>
    </Menu>
  );
};

export default HamburgerMenu;
