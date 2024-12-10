import { Box, Heading, useMediaQuery } from "@chakra-ui/react";
import SocialMediaButton from "./SocialMediaButton";

const Footer = () => {
  const isLargerThan600 = useMediaQuery("(min-width: 600px)");

  return (
    <Box
      py={4}
      px={isLargerThan600 ? 8 : 4}
      display="flex"
      alignItems="center"
      gap={4}
      backgroundColor="white"
      boxShadow="lg"
      justifyContent="center"
    >
      <Heading size="lg" mr={8}>
        Connect with Callie:
      </Heading>
      {["linkedin", "youtube", "github", "mail"].map((type) => (
        <SocialMediaButton key={type} type={type} />
      ))}
    </Box>
  );
};

export default Footer;
