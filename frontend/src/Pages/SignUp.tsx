import { Box, useMediaQuery } from "@chakra-ui/react";
import BodyHeading from "../Components/BodyHeading";
import Section from "../Components/Section";
import SignUpForm from "../Components/SignUp/SignUpForm";
import Paragraph from "../Components/Paragraph";
import MyButton from "../Components/MyButton";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../App";

export type SignUpData = {
  token: boolean;
};

const SignUp = () => {
  const context: Context = useOutletContext();
  const navigate = useNavigate();
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");

  console.log("isLargerThan500", isLargerThan500);

  return (
    <Section screenSizeParameter={false} alignItemsCenter={false}>
      <BodyHeading textAlignCenter={true}>
        Join the Coding with Callie community!
      </BodyHeading>
      <SignUpForm updateUser={context.updateUser} />
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
