import { Box } from "@chakra-ui/react";

type Props = {
  children: string;
  onClick?: any;
  widthSize?: any;
  disabled?: boolean;
};

const MyButton = ({ children, onClick, widthSize, disabled }: Props) => {
  return (
    <Box
      as="button"
      border="1px solid #79A9CD"
      p={2}
      borderRadius={4}
      layerStyle="button"
      onClick={onClick}
      w={widthSize}
      disabled={disabled}
    >
      {children}
    </Box>
  );
};

export default MyButton;
