import { Box, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  menuItems: any;
};

const FullMenu = ({ menuItems }: Props) => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  return (
    <Box display="flex" gap={10}>
      {menuItems.map((item: any) => {
        if (!isLargerThan600) {
          return (
            <Link to={`/${item.path}`}>
              <Box color="#45446A" _hover={{ textDecoration: "underline" }}>
                {item.name}
              </Box>
            </Link>
          );
        } else {
          if (item.name !== "Account Details") {
            return (
              <Link to={`/${item.path}`}>
                <Box color="#45446A" _hover={{ textDecoration: "underline" }}>
                  {item.name}
                </Box>
              </Link>
            );
          } else {
            return null;
          }
        }
      })}
    </Box>
  );
};

export default FullMenu;
