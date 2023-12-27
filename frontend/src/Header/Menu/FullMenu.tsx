import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {
  menuItems: any;
};

const FullMenu = ({ menuItems }: Props) => {
  return (
    <Box display="flex" gap={10}>
      {menuItems.map((item: any) => {
        return (
          <Link to={`/${item.path}`}>
            <Box color="#45446A" _hover={{ textDecoration: "underline" }}>
              {item.name}
            </Box>
          </Link>
        );
      })}
    </Box>
  );
};

export default FullMenu;
