import { Box } from "@chakra-ui/react";
import BodyHeading from "../BodyHeading";
import { useNavigate } from "react-router-dom";
import LinkToChecklistButton, { ChecklistItem } from "./LinkToChecklistButton";
import { ChecklistType } from "./ChecklistContainer";
import { useDrop } from "react-dnd";
import { axiosPrivate } from "../../helpers/axios_instances";

type Props = {
  children: ChecklistType[];
  columnName: string;
  checklistId: number;
  setChecklists: (checklists: ChecklistType[]) => void;
};

const ProgressColumn = ({
  children,
  columnName,
  checklistId,
  setChecklists,
}: Props) => {
  const navigate = useNavigate();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "CHECKLIST_ITEM",
    drop: (item: ChecklistItem) => {
      axiosPrivate
        .patch(`/checklists/${checklistId}/${item.id}`, {
          field: "status",
          value: columnName,
        })
        .then((response) => {
          setChecklists(response.data);
          console.log("Updated", response.data);
        });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Box
      ref={drop}
      display="flex"
      flexDirection="column"
      p={4}
      border="1px solid #ccc"
      backgroundColor={isOver ? "lightblue" : "white"}
    >
      <BodyHeading fontSize={20}>{columnName}</BodyHeading>
      {children.map((child) => {
        return (
          <LinkToChecklistButton
            key={child.id}
            id={child.id}
            name={child.name}
            onClick={() => {
              navigate(`/checklist/${child.id}`);
            }}
          />
        );
      })}
    </Box>
  );
};

export default ProgressColumn;
