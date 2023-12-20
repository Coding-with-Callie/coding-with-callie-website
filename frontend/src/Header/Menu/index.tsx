import { useMediaQuery } from "@chakra-ui/react";
import HamburgerMenu from "./HamburgerMenu";
import FullMenu from "./FullMenu";
import { menuItems } from "./menuItems";

const Menus = () => {
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");

  return (
    <>
      {isLargerThan1000 ? (
        <FullMenu menuItems={menuItems} />
      ) : (
        <HamburgerMenu menuItems={menuItems} />
      )}
    </>
  );
};

export default Menus;
