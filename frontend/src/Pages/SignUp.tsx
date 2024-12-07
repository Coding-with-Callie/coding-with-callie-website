import { Box, useMediaQuery, Text } from "@chakra-ui/react";
import Section from "../Components/Section";
import SignUpForm from "../Components/SignUp/SignUpForm";
import MyButton from "../Components/MyButton";
import { useNavigate } from "react-router-dom";

export type SignUpData = {
  token: boolean;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [isLargerThan450] = useMediaQuery("(min-width: 450px)");

  return (
    <>
      <SignUpForm />
      <Section>
        <Box
          display="flex"
          gap={6}
          alignItems="center"
          justifyContent="center"
          flexDirection={isLargerThan450 ? "row" : "column"}
        >
          <Text layerStyle="text" w="fit-content" whiteSpace="nowrap">
            Already have an account?
          </Text>
          <MyButton
            onClick={() => {
              navigate("/log-in");
            }}
          >
            Sign in instead!
          </MyButton>
        </Box>
      </Section>
    </>
  );
};

export default SignUp;
