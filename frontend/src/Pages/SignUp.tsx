import { Box, useMediaQuery } from "@chakra-ui/react";
import Section from "../Components/Section";
import SignUpForm from "../Components/SignUp/SignUpForm";
import Paragraph from "../Components/Paragraph";
import MyButton from "../Components/MyButton";
import { useNavigate } from "react-router-dom";

export type SignUpData = {
  token: boolean;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");

  return (
    <Section>
      <SignUpForm />
      <Box
        display="flex"
        gap={isLargerThan500 ? 10 : 2}
        alignItems="center"
        justifyContent="center"
        mt={6}
        w="100%"
        flexDirection={isLargerThan500 ? "row" : "column"}
      >
        <Paragraph margin={false}>Already have an account?</Paragraph>
        <MyButton
          onClick={() => {
            navigate("/log-in");
          }}
          widthSize={!isLargerThan500 && "100%"}
        >
          Sign in instead!
        </MyButton>
      </Box>
    </Section>
  );
};

export default SignUp;
