/* eslint-disable @typescript-eslint/no-unused-vars */
import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  useMediaQuery,
  Avatar,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import MyButton from "../Components/MyButton";
import Paragraph from "../Components/Paragraph";
import Alert from "../Components/Profile/Alert";
import EditModal from "../Components/Profile/EditModal";
import EditPhotoModal from "../Components/Profile/EditPhotoModal";
import SessionFeedback from "../Components/Profile/SessionFeedback";
import Section from "../Components/Section";
import Admin from "../Components/Profile/Admin";
import { Workshop } from "./Workshops";

export type Feedback = {
  id: number;
  immediateChangesRequested: string;
  longTermChangesRequested: string;
  positiveFeedback: string;
  submission: any;
};

export type Submission = {
  id: number;
  session: number;
  url: string;
  user: any[];
  feedback: any[];
};

export type Data = {
  email: string;
  id: number;
  name: string;
  role: string;
  submissions: Submission[];
  feedback: Feedback[];
  workshops: Workshop[];
};

const Profile = () => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const {
    isOpen: isOpenPhotoModal,
    onOpen: onOpenPhotoModal,
    onClose: onClosePhotoModal,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const data = useLoaderData() as Data;
  const context = useOutletContext() as Context;

  const navigate = useNavigate();

  useEffect(() => {
    context.updateUser(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const currentName = context.user?.name as string;
  const currentUsername = context.user?.username as string;
  const currentEmail = context.user?.email as string;

  const [field, setField] = useState("");
  const [fieldValue, setFieldValue] = useState("");

  const [name, setName] = useState(currentName);
  const [username, setUsername] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);
  const [password, setPassword] = useState(currentEmail);

  const showNotification = (message: string, type: "error" | "success") => {
    toast[type](message, { toastId: `${type}-${message}` });
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/log-in");
    showNotification("You have been logged out of your account!", "success");
  };

  const deleteAccount = () => {
    const token = localStorage.getItem("token");

    axios
      .post(
        `${
          process.env.REACT_APP_API || "http://localhost:3001/api"
        }/auth/delete-account`,
        { id: context.user.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        localStorage.removeItem("token");
        const newUser = {};
        context.updateUser(newUser);
        navigate("/sign-up");
        showNotification("Your account has been deleted!", "success");
      });
  };

  return (
    <>
      <Section screenSizeParameter={false} alignItemsCenter={true}>
        <BodyHeading textAlignCenter={true}>Account Details</BodyHeading>

        {currentName ? (
          <Paragraph margin={false}>
            {`Welcome, ${currentName}! You can manage your account details here!`}
          </Paragraph>
        ) : null}
      </Section>
      <Box maxW="900px" margin="0 auto">
        <Section
          screenSizeParameter={isLargerThan600}
          alignItemsCenter={true}
          gapSize={isLargerThan600 ? 75 : 0}
        >
          <Box w="25%">
            <Avatar
              size="2xl"
              name={context.user.username}
              src={context.user.photo}
            />

            <Box position="relative" top="-130px" left="130px">
              <IconButton
                aria-label="edit"
                icon={<EditIcon />}
                onClick={onOpenPhotoModal}
              />
            </Box>
          </Box>
          <Box w={isLargerThan600 ? "75%" : "100%"}>
            <Box px={2}>
              <Box
                display="flex"
                justifyContent="space-between"
                mb={2}
                alignItems="center"
              >
                <Paragraph margin={false}>Name: </Paragraph>
                <Box display="flex" w="70%" alignItems="center">
                  <Paragraph flexWeight={1} margin={false}>
                    {currentName}
                  </Paragraph>
                  <IconButton
                    aria-label="edit"
                    icon={<EditIcon />}
                    onClick={() => {
                      setField("name");
                      setFieldValue(name);
                      onOpen();
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                mb={2}
                alignItems="center"
              >
                <Paragraph margin={false}>Username: </Paragraph>
                <Box display="flex" w="70%" alignItems="center">
                  <Paragraph flexWeight={1} margin={false}>
                    {currentUsername}
                  </Paragraph>
                  <IconButton
                    aria-label="edit"
                    icon={<EditIcon />}
                    onClick={() => {
                      setField("username");
                      setFieldValue(username);
                      onOpen();
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                mb={2}
                alignItems="center"
              >
                <Paragraph margin={false}>Password: </Paragraph>
                <Box display="flex" w="70%" alignItems="center">
                  <Paragraph flexWeight={1} margin={false}>
                    ******
                  </Paragraph>
                  <IconButton
                    aria-label="edit"
                    icon={<EditIcon />}
                    onClick={() => {
                      setField("password");
                      setFieldValue(password);
                      onOpen();
                    }}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                mb={2}
                alignItems="center"
              >
                <Paragraph margin={false}>Email: </Paragraph>
                <Box display="flex" w="70%" alignItems="center">
                  <Paragraph flexWeight={1} margin={false}>
                    {currentEmail}
                  </Paragraph>
                  <IconButton
                    aria-label="edit"
                    icon={<EditIcon />}
                    onClick={() => {
                      setField("email");
                      setFieldValue(email);
                      onOpen();
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Section>
        <Section screenSizeParameter={false} alignItemsCenter={false}>
          <Box display="flex" gap={4}>
            <MyButton onClick={logout}>Log out</MyButton>
            <MyButton onClick={onOpenAlert}>Delete Account</MyButton>
          </Box>
        </Section>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color="#45446A">Edit {field}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <EditModal field={field} onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal isOpen={isOpenPhotoModal} onClose={onClosePhotoModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color="#45446A">Edit Profile Photo</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <EditPhotoModal onClose={onClosePhotoModal} />
            </ModalBody>
          </ModalContent>
        </Modal>

        <Alert
          isOpenAlert={isOpenAlert}
          onCloseAlert={onCloseAlert}
          cancelRef={cancelRef}
          handleDelete={deleteAccount}
          item="Account"
        />

        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sessionNumber) => {
          return (
            <SessionFeedback sessionNumber={sessionNumber} admin={false} />
          );
        })}

        {context.user.role === "admin" ? <Admin /> : null}
      </Box>
    </>
  );
};

export default Profile;
