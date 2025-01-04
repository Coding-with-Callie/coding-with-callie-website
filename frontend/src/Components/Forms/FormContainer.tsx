import { FormControl } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

const FormContainer = ({ children }: Props) => {
  return (
    <FormControl display="flex" flexDirection="column" gap={6} mx="auto">
      {children}
    </FormControl>
  );
};

export default FormContainer;
