import { useMediaQuery } from "@chakra-ui/react";
import HamburgerMenu from "./HamburgerMenu";
import FullMenu from "./FullMenu";
import { menuItems } from "./menuItems";

const Menus = () => {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  return (
    <>
      {isLargerThan900 ? (
        <FullMenu menuItems={menuItems} />
      ) : (
        <HamburgerMenu menuItems={menuItems} />
      )}
    </>
  );
};

export default Menus;
