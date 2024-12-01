import { Box, useMediaQuery } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

const WorkshopTilesContainer = ({ children }: Props) => {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  return (
    <Box
      display="flex"
      gap={20}
      flexWrap="wrap"
      justifyContent="center"
      maxW={isLargerThan900 ? "75%" : "100%"}
      mx={isLargerThan900 ? "auto" : 8}
      mt={20}
      mb={4}
    >
      {children}
    </Box>
  );
};

export default WorkshopTilesContainer;
