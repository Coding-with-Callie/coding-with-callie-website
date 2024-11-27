import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  useMediaQuery,
  Avatar,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import MyButton from "../Components/MyButton";
import Paragraph from "../Components/Paragraph";
import Alert from "../Components/Profile/Alert";
import EditModal from "../Components/Profile/EditModal";
import EditPhotoModal from "../Components/Profile/EditPhotoModal";
import Section from "../Components/Section";
import { axiosPrivate } from "../helpers/axios_instances";
import { showNotification } from "..";
import ModalWrapper from "../Components/ModalWrapper";

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

  const { user, updateUser } = useOutletContext() as Context;

  const navigate = useNavigate();

  const [field, setField] = useState("");
  const [fieldValue, setFieldValue] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    updateUser({});
    navigate("/log-in");
    showNotification("You have been logged out of your account!", "success");
  };

  const deleteAccount = () => {
    axiosPrivate
      .post("/delete-account", { id: user.id })
      .then(() => {
        localStorage.removeItem("token");
        updateUser({});
        navigate("/sign-up");
        showNotification("Your account has been deleted!", "success");
      })
      .catch((error) => {
        showNotification(error.message, "error");

        if (error.path) {
          navigate(error.path);
        }
      });
  };

  return (
    <>
      <Section>
        <BodyHeading textAlign="center">Account Details</BodyHeading>

        {user.name ? (
          <Paragraph margin={false}>
            {`Welcome, ${user.name}! You can manage your account details here!`}
          </Paragraph>
        ) : null}
      </Section>
      <Box maxW="900px" margin="0 auto">
        <Section
          alignItems={isLargerThan600 ? "center" : "left"}
          gap={isLargerThan600 ? 75 : 0}
        >
          <Box w="25%">
            <Avatar size="2xl" name={user.username} src={user.photo} />

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
                    {user.name}
                  </Paragraph>
                  <IconButton
                    aria-label="edit"
                    icon={<EditIcon />}
                    onClick={() => {
                      setField("name");
                      setFieldValue(user.name);
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
                    {user.username}
                  </Paragraph>
                  <IconButton
                    aria-label="edit"
                    icon={<EditIcon />}
                    onClick={() => {
                      setField("username");
                      setFieldValue(user.username);
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
                      setFieldValue(user.password);
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
                    {user.email}
                  </Paragraph>
                  <IconButton
                    aria-label="edit"
                    icon={<EditIcon />}
                    onClick={() => {
                      setField("email");
                      setFieldValue(user.email);
                      onOpen();
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Section>
        <Section>
          <Box display="flex" gap={4}>
            <MyButton onClick={logout}>Log out</MyButton>
            <MyButton onClick={onOpenAlert}>Delete Account</MyButton>
          </Box>
        </Section>

        <ModalWrapper isOpen={isOpen} onClose={onClose}>
          <EditModal field={field} value={fieldValue} onClose={onClose} />
        </ModalWrapper>

        <ModalWrapper isOpen={isOpenPhotoModal} onClose={onClosePhotoModal}>
          <EditPhotoModal onClose={onClosePhotoModal} />
        </ModalWrapper>

        <Alert
          isOpenAlert={isOpenAlert}
          onCloseAlert={onCloseAlert}
          cancelRef={cancelRef}
          handleDelete={deleteAccount}
          item="Account"
        />
      </Box>
    </>
  );
};

export default Profile;
