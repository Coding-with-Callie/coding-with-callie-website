import { Box, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import MyButton from "../Components/MyButton";
import Alert from "../Components/Profile/Alert";
import Section from "../Components/Section";
import { axiosPrivate } from "../helpers/axios_instances";
import { showNotification } from "..";
import AccountDetails from "../Components/Profile/AccountDetails";

const Profile = () => {
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();

  const cancelRef = useRef<HTMLButtonElement>(null);

  const { user, updateUser } = useOutletContext() as Context;

  const navigate = useNavigate();

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
        <AccountDetails user={user} />

        <Box display="flex" gap={4}>
          <MyButton onClick={logout}>Log out</MyButton>
          <MyButton onClick={onOpenAlert}>Delete Account</MyButton>
        </Box>
      </Section>

      <Alert
        isOpenAlert={isOpenAlert}
        onCloseAlert={onCloseAlert}
        cancelRef={cancelRef}
        handleDelete={deleteAccount}
        item="Account"
      />
    </>
  );
};

export default Profile;
