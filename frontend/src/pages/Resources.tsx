import { Box, Text } from "@chakra-ui/react";
import { Link, useLoaderData, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";

const Resources = () => {
  const data = useLoaderData();

  const context: Context = useOutletContext();
  context.updateUser(data);

  return (
    <Section screenSizeParameter={false} alignItemsCenter={false}>
      <BodyHeading textAlignCenter={true}>Resources</BodyHeading>
      <Box>
        {context.user.name ? (
          <Text>Here are your resources, {context.user.name}!</Text>
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

export default Resources;
