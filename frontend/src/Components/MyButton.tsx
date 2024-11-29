import { Button, Spinner } from "@chakra-ui/react";

type Props = {
  children: any;
  onClick?: any;
  widthSize?: any;
  disabled?: boolean;
  loading?: boolean;
};

const MyButton = ({
  children,
  onClick,
  widthSize,
  disabled,
  loading = false,
}: Props) => {
  return (
    <Button
      colorScheme="green"
      w={widthSize}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? <Spinner /> : children}
    </Button>
  );
};

export default MyButton;
