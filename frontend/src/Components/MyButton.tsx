import { Box } from "@chakra-ui/react";

type Props = {
  children: string;
  onClick?: any;
};

const MyButton = ({ children, onClick }: Props) => {
  return (
    <Box
      as="button"
      border="1px solid #79A9CD"
      p={2}
      borderRadius={4}
      layerStyle="button"
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

export default MyButton;
