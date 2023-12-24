import { EditIcon } from "@chakra-ui/icons";
import { Box, useMediaQuery, Avatar, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import AccessRequired from "../Components/AccessRequired";
import BodyHeading from "../Components/BodyHeading";
import MyButton from "../Components/MyButton";
import Paragraph from "../Components/Paragraph";
import EditModal from "../Components/Profile/EditModal";
import Section from "../Components/Section";

const Profile = () => {
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const data = useLoaderData();
  const navigate = useNavigate();

  const context: Context = useOutletContext();
  context.updateUser(data);
  const currentName = context.user?.name as string;
  const currentUsername = context.user?.username as string;
  const currentEmail = context.user?.email as string;

  const [editName, setEditName] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  const [name, setName] = useState(currentName);
  const [username, setUsername] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);

  const logout = () => {
    localStorage.removeItem("token");
    const newUser = {};
    context.updateUser(newUser);
    navigate("/log-in");
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
      {currentName ? (
        <Box maxW="900px" margin="0 auto">
          <Section
            screenSizeParameter={isLargerThan600}
            alignItemsCenter={true}
            gapSize={50}
          >
            <Avatar size="2xl" name={context.user.username} />
            <Box flex={1} w="100%">
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
                        setEditName(true);
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
                        setEditUsername(true);
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
                        setEditEmail(true);
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
              <MyButton>Delete Account</MyButton>
            </Box>
          </Section>
          {editName ? (
            <EditModal
              field="name"
              fieldValue={name}
              updateFieldValue={(name) => {
                setName(name);
              }}
            />
          ) : null}
          {editUsername ? (
            <EditModal
              field="username"
              fieldValue={username}
              updateFieldValue={(username) => {
                setUsername(username);
              }}
            />
          ) : null}
          {editEmail ? (
            <EditModal
              field="email"
              fieldValue={email}
              updateFieldValue={(email) => {
                setEmail(email);
              }}
            />
          ) : null}
        </Box>
      ) : (
        <AccessRequired />
      )}
    </>
  );
};

export default Profile;
