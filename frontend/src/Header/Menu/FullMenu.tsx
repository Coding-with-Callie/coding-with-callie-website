import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {
  menuItems: any;
};

const FullMenu = ({ menuItems }: Props) => {
  return (
    <Box display="flex" gap={4}>
      {menuItems.map((item: any, index: number) => {
        return (
          <Link to={`/${item.path}`} key={index}>
            <Button>{item.name}</Button>
          </Link>
        );
      })}
    </Box>
  );
};

export default FullMenu;
