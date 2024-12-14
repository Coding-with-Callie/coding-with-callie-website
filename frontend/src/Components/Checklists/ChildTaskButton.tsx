import { Box } from "@chakra-ui/react";
import MyButton from "../MyButton";

type Props = {
  name: string;
  onClick: () => void;
};

const ChildTaskButton = ({ name, onClick }: Props) => {
  return (
    <Box mb={2}>
      <MyButton onClick={onClick}>{name}</MyButton>
    </Box>
  );
};

export default ChildTaskButton;
