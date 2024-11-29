import { FormControl } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

const FormContainer = ({ children }: Props) => {
  return (
    <FormControl
      display="flex"
      flexDirection="column"
      gap={6}
      backgroundColor="white"
      padding={10}
      borderRadius={5}
      maxW={"600px"}
      margin="0 auto"
    >
      {children}
    </FormControl>
  );
};

export default FormContainer;
