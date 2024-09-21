import { Button } from "@chakra-ui/react";

type Props = {
  children: string;
  onClick?: any;
  widthSize?: any;
  disabled?: boolean;
};

const DeleteButton = ({ children, onClick, widthSize, disabled }: Props) => {
  return (
    <Button
      colorScheme="red"
      w={widthSize}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default DeleteButton;
