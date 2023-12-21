import { Box } from "@chakra-ui/react";

type Props = {
  children: string;
};

const MyButton = ({ children }: Props) => {
  return (
    <Box
      as="button"
      border="1px solid #79A9CD"
      p={2}
      borderRadius={4}
      layerStyle="button"
    >
      {children}
    </Box>
  );
};

export default MyButton;
