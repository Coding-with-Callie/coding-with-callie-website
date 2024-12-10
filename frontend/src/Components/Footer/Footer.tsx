import { Box, Heading, useMediaQuery } from "@chakra-ui/react";
import { GrGithub, GrLinkedin, GrMail, GrYoutube } from "react-icons/gr";
import { button } from "../theme";
import { useState } from "react";
import { lightenByPercentage } from "../../helpers/helpers";
import SocialMediaButton from "./SocialMediaButton";

const Footer = () => {
  const isLargerThan600 = useMediaQuery("(min-width: 600px)");

  return (
    <Box
      mt={20}
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
      <SocialMediaButton type="linkedin" />
      <SocialMediaButton type="youtube" />
      <SocialMediaButton type="github" />
      <SocialMediaButton type="mail" />
    </Box>
  );
};

export default Footer;
