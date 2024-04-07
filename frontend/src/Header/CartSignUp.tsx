import { Box } from "@chakra-ui/react";
import Paragraph from "../Components/Paragraph";
import BodyHeading from "../Components/BodyHeading";
import SignUpForm from "../Components/SignUp/SignUpForm";
import MyButton from "../Components/MyButton";

type Props = {
  hasAccount: boolean;
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
  updateUser: (newUser: any) => void;
  updateCheckoutStep: (newStep: number) => void;
  onClose?: () => void;
};

const CartSignUp = ({
  hasAccount,
  setHasAccount,
  updateUser,
  updateCheckoutStep,
  onClose,
}: Props) => {
  return (
    <>
      <Box mb={20}>
        <Paragraph>
          You must have an account to complete the checkout process!
        </Paragraph>
      </Box>
      <BodyHeading textAlignCenter={true}>Sign up!</BodyHeading>
      <SignUpForm
        updateUser={updateUser}
        updateCheckoutStep={updateCheckoutStep}
        onClose={onClose}
      />
      <Box
        display="flex"
        gap={4}
        alignItems="center"
        justifyContent="center"
        mt={20}
      >
        <Paragraph margin={false}>Have an account?</Paragraph>
        <MyButton onClick={() => setHasAccount(!hasAccount)}>Log in</MyButton>
      </Box>
    </>
  );
};

export default CartSignUp;