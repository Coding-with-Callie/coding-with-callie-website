import { Box } from "@chakra-ui/react";
import BodyHeading from "../BodyHeading";
import { useNavigate } from "react-router-dom";
import LinkToChecklistButton from "./LinkToChecklistButton";
import { ChecklistType } from "./ChecklistContainer";

type Props = {
  children: ChecklistType[];
  columnName: string;
  projectId: number;
};

const ProgressColumn = ({ children, columnName, projectId }: Props) => {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column">
      <BodyHeading fontSize={20}>{columnName}</BodyHeading>
      {children.map((child) => {
        return (
          <LinkToChecklistButton
            key={child.id}
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
