import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {
  menuItems: any;
};

const HamburgerMenu = ({ menuItems }: Props) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        {menuItems.map((item: any) => {
          return (
            <Link to={`/${item.path}`}>
              <MenuItem>{item.name}</MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default HamburgerMenu;
