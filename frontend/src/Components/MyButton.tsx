import { Button } from "@chakra-ui/react";

type Props = {
  children: any;
  onClick?: any;
  widthSize?: any;
  disabled?: boolean;
};

const MyButton = ({ children, onClick, widthSize, disabled }: Props) => {
  return (
    <Button
      colorScheme="green"
      w={widthSize}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default MyButton;
