import { Box, Text } from "@chakra-ui/react";
import Section from "../Section";
import BodyHeading from "../BodyHeading";
import MyButton from "../MyButton";
import ProgressColumn from "./ProgressColumn";

export type ChecklistType = {
  id: number;
  name: string;
  description?: string;
  children: ChecklistType[];
  parentList: null | number;
  status: "To Do" | "In Progress" | "Done";
};

type Props = {
  task: ChecklistType;
  children: ChecklistType[];
  setChecklists: (checklists: ChecklistType[]) => void;
};

const ChecklistContainer = ({ task, children, setChecklists }: Props) => {
  const toDoChildren = children.filter((child) => child.status === "To Do");
  const inProgressChildren = children.filter(
    (child) => child.status === "In Progress"
  );
  const doneChildren = children.filter((child) => child.status === "Done");

  return (
    <Section>
      <BodyHeading>{task.name}</BodyHeading>
      <Text mb={6}>{task.description}</Text>
      {children.length > 0 && (
        <>
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
            gap={4}
          >
            <ProgressColumn
              children={toDoChildren}
              columnName="To Do"
              checklistId={task.id}
              setChecklists={setChecklists}
            />
            <ProgressColumn
              children={inProgressChildren}
              columnName="In Progress"
              checklistId={task.id}
              setChecklists={setChecklists}
            />
            <ProgressColumn
              children={doneChildren}
              columnName="Done"
              checklistId={task.id}
              setChecklists={setChecklists}
            />
          </Box>
          <Box mt={8} display="flex" gap={4}>
            <MyButton variant="outline">Add a checklist</MyButton>
            <MyButton variant="outline">Add a task</MyButton>
          </Box>
        </>
      )}
    </Section>
  );
};

export default ChecklistContainer;
