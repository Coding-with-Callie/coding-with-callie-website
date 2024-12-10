import { FormControl } from "@chakra-ui/react";
import Section from "../Section";

type Props = {
  children: React.ReactNode;
};

const FormContainer = ({ children }: Props) => {
  return (
    <Section>
      <FormControl display="flex" flexDirection="column" gap={6} mx="auto">
        {children}
      </FormControl>
    </Section>
  );
};

export default FormContainer;
