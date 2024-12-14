import { Box } from "@chakra-ui/react";
import BodyHeading from "../BodyHeading";
import ChildTaskButton from "./ChildTaskButton";
import { useNavigate } from "react-router-dom";

type Props = {
  children: { name: string; id: number }[];
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
          <ChildTaskButton
            key={child.id}
            name={child.name}
            onClick={() => {
              navigate(`/project/${projectId}/feature/${child.id}`);
            }}
          />
        );
      })}
    </Box>
  );
};

export default ProgressColumn;
