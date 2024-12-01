import { Box, useMediaQuery } from "@chakra-ui/react";

type Props = {
  children: any;
  backgroundColor?: string;
};

const Section = ({ children, backgroundColor = "white" }: Props) => {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  return (
    <Box
      mt={20}
      mb={4}
      p={8}
      maxW={isLargerThan900 ? "75%" : "100%"}
      backgroundColor={backgroundColor}
      borderRadius={5}
      mx={isLargerThan900 ? "auto" : 8}
      boxShadow="lg"
    >
      {children}
    </Box>
  );
};

export default Section;
