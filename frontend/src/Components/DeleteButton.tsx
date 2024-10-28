import { Button } from "@chakra-ui/react";
import { FaRegTrashAlt } from "react-icons/fa";

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
      rightIcon={<FaRegTrashAlt />}
    >
      {children}
    </Button>
  );
};

export default DeleteButton;
