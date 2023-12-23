import { Box, Text } from "@chakra-ui/react";
import { Link, useLoaderData, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";

const Profile = () => {
  const data = useLoaderData();

  const context: Context = useOutletContext();
  context.updateUser(data);

  const name = context.user?.name as string;

  return (
    <Section screenSizeParameter={false} alignItemsCenter={false}>
      <BodyHeading textAlignCenter={true}>
        {name ? `${name}'s Profile` : "User Profile"}
      </BodyHeading>
      <Box>
        {name ? (
          <Box>
            <Text>Welcome to your profile, {name}!</Text>
            <Box display="flex" alignItems="center" gap={4}>
              <Text>Name: {name}</Text>
              <MyButton>Edit</MyButton>
            </Box>
            <Box display="flex" alignItems="center" gap={4}>
              <Text>Username: {context.user.username}</Text>
              <MyButton>Edit</MyButton>
            </Box>
          </Box>
        ) : (
          <Box>
            <Text>You do not have access to this page.</Text>
            <Box display="flex" gap={4} justifyContent="center" mt={4}>
              <Link to="/log-in">
                <MyButton>Login</MyButton>
              </Link>
              <Link to="/sign-up">
                <MyButton>Sign up</MyButton>
              </Link>
            </Box>
          </Box>
        )}
      </Box>
    </Section>
  );
};

export default Profile;
