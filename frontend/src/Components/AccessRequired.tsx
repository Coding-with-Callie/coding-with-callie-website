import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import MyButton from "./MyButton";
import Paragraph from "./Paragraph";

const AccessRequired = () => {
  return (
    <Box margin="0 auto">
      <Paragraph textAlign="center">
        You do not have access to this page.
      </Paragraph>
      <Box display="flex" gap={4} justifyContent="center" mt={10}>
        <Link to="/log-in">
          <MyButton>Login</MyButton>
        </Link>
        <Link to="/sign-up">
          <MyButton>Sign up</MyButton>
        </Link>
      </Box>
    </Box>
  );
};

export default AccessRequired;
