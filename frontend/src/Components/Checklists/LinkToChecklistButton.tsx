import { Box } from "@chakra-ui/react";
import MyButton from "../MyButton";
import { useDrag } from "react-dnd";

type Props = {
  name: string;
  id: number;
  onClick: () => void;
};

export type ChecklistItem = {
  id: number;
  name: string;
};

const ChecklistButton = ({ name, id, onClick }: Props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CHECKLIST_ITEM",
    item: { id, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Box ref={drag} opacity={isDragging ? 0.5 : 1}>
      <MyButton onClick={onClick}>{name}</MyButton>
    </Box>
  );
};

export default ChecklistButton;
