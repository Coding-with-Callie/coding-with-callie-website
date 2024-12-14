import { Box, Text } from "@chakra-ui/react";
import Section from "../Section";
import BodyHeading from "../BodyHeading";
import MyButton from "../MyButton";
import ProgressColumn from "./ProgressColumn";

export type ChecklistType = {
  id: number;
  name: string;
  status: "To Do" | "In Progress" | "Done!";
};

export type ChecklistWithChildrenType = {
  id: number;
  name: string;
  description?: string;
  children: ChecklistWithChildrenType[] | ChecklistType[];
  status: "To Do" | "In Progress" | "Done!";
};

type Props = {
  task: ChecklistWithChildrenType;
  children: ChecklistType[];
};

const ChecklistWithChildren = ({ task, children }: Props) => {
  console.log("task", task);

  const toDoChildren = children.filter((child) => child.status === "To Do");
  const inProgressChildren = children.filter(
    (child) => child.status === "In Progress"
  );
  const doneChildren = children.filter((child) => child.status === "Done!");

  return (
    <Section>
      <BodyHeading>{task.name}</BodyHeading>
      <Text mb={6}>{task.description}</Text>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        gap={4}
      >
        <ProgressColumn
          children={toDoChildren}
          columnName="To Do"
          projectId={task.id}
        />
        <ProgressColumn
          children={inProgressChildren}
          columnName="In Progress"
          projectId={task.id}
        />
        <ProgressColumn
          children={doneChildren}
          columnName="Done"
          projectId={task.id}
        />
      </Box>
      <Box mt={8} display="flex" gap={4}>
        <MyButton variant="outline">Add a task with children</MyButton>
        <MyButton variant="outline">Add a checklist</MyButton>
      </Box>
    </Section>
  );
};

export default ChecklistWithChildren;
