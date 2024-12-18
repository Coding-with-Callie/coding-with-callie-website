import { Box } from "@chakra-ui/react";
import BodyHeading from "../BodyHeading";
import { useNavigate } from "react-router-dom";
import LinkToChecklistButton, { ChecklistItem } from "./LinkToChecklistButton";
import { ChecklistType } from "./ChecklistContainer";
import { useDrop } from "react-dnd";
import { axiosPrivate } from "../../helpers/axios_instances";
import { button } from "../theme";
import { lightenByPercentage } from "../../helpers/helpers";

type Props = {
  children: ChecklistType[];
  columnName: string;
  setChecklist: (checklist: ChecklistType) => void;
  checklistId: number | null;
};

const ProgressColumn = ({
  children,
  columnName,
  setChecklist,
  checklistId,
}: Props) => {
  const navigate = useNavigate();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "CHECKLIST_ITEM",
    drop: (checklist: ChecklistItem) => {
      axiosPrivate
        .patch(`/checklists/${checklist.id}`, {
          field: "status",
          value: columnName,
          parentListId: checklistId,
        })
        .then((response) => {
          setChecklist(response.data);
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
      gap={4}
      p={4}
      border={`1px solid ${button}`}
      borderRadius={4}
      backgroundColor={isOver ? lightenByPercentage(button, 90) : "white"}
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
