import { Box, Text, useMediaQuery } from "@chakra-ui/react";

const Footer = () => {
  const isLargerThan600 = useMediaQuery("(min-width: 600px)");

  return (
    <Box
      mt={20}
      py={8}
      px={isLargerThan600 ? 8 : 4}
      display="flex"
      alignItems="center"
      gap={4}
      backgroundColor="white"
      boxShadow="lg"
      border="1px"
    >
      <Text>Connect with Callie:</Text>
    </Box>
  );
};

export default Footer;
