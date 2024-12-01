import { Button, Spinner } from "@chakra-ui/react";

type Props = {
  children: any;
  onClick?: any;
  width?: any;
  disabled?: boolean;
  loading?: boolean;
};

const MyButton = ({
  children,
  onClick,
  width = "100%",
  disabled,
  loading = false,
}: Props) => {
  return (
    <Button colorScheme="green" w={width} onClick={onClick} disabled={disabled}>
      {loading ? <Spinner /> : children}
    </Button>
  );
};

export default MyButton;
