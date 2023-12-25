import { useMediaQuery } from "@chakra-ui/react";
import HamburgerMenu from "./HamburgerMenu";
import FullMenu from "./FullMenu";
import { menuItems } from "./menuItems";

const Menus = () => {
  const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");

  return (
    <>
      {isLargerThan1300 ? (
        <FullMenu menuItems={menuItems} />
      ) : (
        <HamburgerMenu menuItems={menuItems} />
      )}
    </>
  );
};

export default Menus;
