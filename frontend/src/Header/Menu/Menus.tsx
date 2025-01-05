import { useMediaQuery } from "@chakra-ui/react";
import HamburgerMenu from "./HamburgerMenu";
import FullMenu from "./FullMenu";

const Menus = ({ pages }: any) => {
  const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");

  return (
    <>
      {isLargerThan1300 ? (
        <FullMenu menuItems={pages} />
      ) : (
        <HamburgerMenu menuItems={pages} />
      )}
    </>
  );
};

export default Menus;
