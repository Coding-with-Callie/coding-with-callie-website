import { Box } from "@chakra-ui/react";
import Paragraph from "../Components/Paragraph";
import BodyHeading from "../Components/BodyHeading";
import LogInForm from "../Components/LogIn/LogInForm";
import { useState } from "react";
import MyButton from "../Components/MyButton";

type Props = {
  updateUser: (newUser: any) => void;
  setCheckoutStep: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
  hasAccount: boolean;
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartLogin = ({
  updateUser,
  setCheckoutStep,
  onClose,
  hasAccount,
  setHasAccount,
}: Props) => {
  const [userData, setUserData] = useState<any>({});
  const [submitClicked, setSubmitClicked] = useState(false);

  return (
    <>
      <Box mb={20}>
        <Paragraph>You must log in to complete the checkout process!</Paragraph>
      </Box>
      <BodyHeading textAlignCenter={true}>Log in!</BodyHeading>
      <LogInForm
        userData={userData}
        setUserData={setUserData}
        submitClicked={submitClicked}
        setSubmitClicked={setSubmitClicked}
        updateUser={updateUser}
        setCheckoutStep={setCheckoutStep}
        onClose={onClose}
      />
      <Box
        display="flex"
        gap={4}
        alignItems="center"
        justifyContent="center"
        mt={20}
      >
        <Paragraph margin={false}>Don't have an account?</Paragraph>
        <MyButton onClick={() => setHasAccount(!hasAccount)}>Sign up</MyButton>
      </Box>
    </>
  );
};

export default CartLogin;
