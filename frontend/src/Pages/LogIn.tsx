import {
  Input,
  Box,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import MyButton from "../Components/MyButton";
import Paragraph from "../Components/Paragraph";
import Section from "../Components/Section";
import LogInForm from "../Components/LogIn/LogInForm";

const LogIn = () => {
  const [isLargerThan450] = useMediaQuery("(min-width: 450px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const data = useLoaderData();
  const [userData, setUserData] = useState<any>(data);
  const [email, setEmail] = useState<string>("");
  const [submitClicked, setSubmitClicked] = useState(false);

  const context: Context = useOutletContext();

  if (data) {
    context.updateUser(data);
  }

  const showNotification = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    toast[type](message, { toastId: `${type}-${message}` });
  };

  const resetPassword = async () => {
    axios
      .post(
        `${
          process.env.REACT_APP_API || "http://localhost:3001/api"
        }/auth/forgot-password`,
        { email }
      )
      .then((response) => {
        showNotification("Please check your email for next steps.", "info");
        setEmail("");
        onClose();
      })
      .catch((error) => {
        if (error.response.data.message === "Unauthorized") {
          setEmail("");
          onClose();
          showNotification("Please check your email for next steps.", "info");
        } else {
          let message: string = error.response.data.message[0];
          showNotification(`${message}`, "error");
        }
      });
  };

  return (
    <Section screenSizeParameter={false} alignItemsCenter={false}>
      <BodyHeading textAlignCenter={true}>Log in!</BodyHeading>
      <LogInForm
        userData={userData}
        setUserData={setUserData}
        submitClicked={submitClicked}
        setSubmitClicked={setSubmitClicked}
        updateUser={context.updateUser}
      />
      <Box
        display="flex"
        gap={2}
        alignItems="center"
        justifyContent="center"
        mt={6}
        w="100%"
        flexDirection={isLargerThan450 ? "row" : "column"}
      >
        <Paragraph margin={false}>Forgot your password?</Paragraph>
        <MyButton onClick={onOpen} widthSize={isLargerThan450 ? null : "100%"}>
          Reset Password
        </MyButton>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#45446A" mx={2}>
            Enter the email address associated with your account:
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexDirection="column" gap={4} mb={4}>
              <Input
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                variant="filled"
                value={email}
              />
              <MyButton onClick={resetPassword}>
                Send verification email!
              </MyButton>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Section>
  );
};

export default LogIn;
