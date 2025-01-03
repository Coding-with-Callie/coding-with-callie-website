import { useMediaQuery } from "@chakra-ui/react";
import HamburgerMenu from "./HamburgerMenu";
import FullMenu from "./FullMenu";
import { menuItem, menuItems } from "./menuItems";

const Menus = ({ user }: any) => {
  const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

  const loggedIn = user?.name;

  const filterMenuItems = (items: menuItem[]) => {
    return items.filter((item) => {
      if (
        (loggedIn && item.hiddenWhenLoggedIn) ||
        (user.role !== "admin" && item.visibleOnlyToAdmin) ||
        (loggedIn && isLargerThan600 && item.name === "Account Details") ||
        (!loggedIn && item.hiddenWhenLoggedOut)
      ) {
        return null;
      }
      return item;
    });
  };

  const filteredMenuItems = filterMenuItems(menuItems);

  return (
    <>
      {isLargerThan1300 ? (
        <FullMenu menuItems={filteredMenuItems} />
      ) : (
        <HamburgerMenu menuItems={filteredMenuItems} />
      )}
    </>
  );
};

export default Menus;
