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
import { useState } from "react";
import { toast } from "react-toastify";
import BodyHeading from "../Components/BodyHeading";
import MyButton from "../Components/MyButton";
import Paragraph from "../Components/Paragraph";
import Section from "../Components/Section";
import LogInForm from "../Components/LogIn/LogInForm";
import { axiosPublic } from "../helpers/axios_instances";

const LogIn = () => {
  const [isLargerThan450] = useMediaQuery("(min-width: 450px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState<string>("");

  const showNotification = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    toast[type](message, { toastId: `${type}-${message}` });
  };

  const resetPassword = async () => {
    axiosPublic
      .post("/forgot-password", {
        email,
      })
      .then(() => {
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
    <Section>
      <BodyHeading>Log in!</BodyHeading>
      <LogInForm />
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
