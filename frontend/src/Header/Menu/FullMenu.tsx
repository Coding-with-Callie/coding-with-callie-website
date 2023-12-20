import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  menuItems: any;
};

const FullMenu = ({ menuItems }: Props) => {
  return (
    <Box display="flex" gap={2}>
      {menuItems.map((item: any) => {
        return (
          <Link to={`/${item.path}`}>
            <Button colorScheme="teal">{item.name}</Button>
          </Link>
        );
      })}
    </Box>
  );
};

export default FullMenu;
