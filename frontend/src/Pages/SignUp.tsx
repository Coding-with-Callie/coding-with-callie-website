import BodyHeading from "../Components/BodyHeading";
import Section from "../Components/Section";
import SignUpForm from "../Components/SignUp/SignUpForm";

export type SignUpData = {
  token: boolean;
};

const SignUp = () => {
  return (
    <Section screenSizeParameter={false} alignItemsCenter={false}>
      <BodyHeading textAlignCenter={true}>
        Join the Coding with Callie community!
      </BodyHeading>
      <SignUpForm />
    </Section>
  );
};

export default SignUp;
