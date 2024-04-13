import { HamburgerIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {
  menuItems: any;
};

const HamburgerMenu = ({ menuItems }: Props) => {
  return (
    <Menu>
      <MenuButton
        colorScheme="green"
        as={Button}
        aria-label="Options"
        px={2}
        py={1}
      >
        <HamburgerIcon boxSize={5} />
      </MenuButton>
      <MenuList>
        {menuItems.map((item: any, index: number) => {
          return (
            <Link to={`/${item.path}`} key={index}>
              <MenuItem color="#45446A">{item.name}</MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default HamburgerMenu;
