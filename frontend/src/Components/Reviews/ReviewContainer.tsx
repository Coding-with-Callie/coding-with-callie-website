import { Box, useMediaQuery } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
  index: number;
};

const ReviewContainer = ({ children, index }: Props) => {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  return (
    <Box
      w={isLargerThan900 ? "65%" : "100%"}
      display="flex"
      flexDirection="column"
      mb={20}
      gap={3}
      border="1px solid #45446A"
      borderRadius={4}
      backgroundColor="white"
      p={4}
      boxShadow="lg"
      key={index}
    >
      {children}
    </Box>
  );
};

export default ReviewContainer;
