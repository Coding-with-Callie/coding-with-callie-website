import { Box } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

const WorkshopTilesContainer = ({ children }: Props) => {
  return (
    <Box
      display="flex"
      gap={20}
      flexWrap="wrap"
      justifyContent="center"
      w="100%"
    >
      {children}
    </Box>
  );
};

export default WorkshopTilesContainer;
