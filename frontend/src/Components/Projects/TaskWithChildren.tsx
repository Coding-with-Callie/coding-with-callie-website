import { Box, Text } from "@chakra-ui/react";
import Section from "../Section";
import BodyHeading from "../BodyHeading";
import MyButton from "../MyButton";
import ProgressColumn from "./ProgressColumn";

export type TaskType = {
  id: number;
  name: string;
  status: "To Do" | "In Progress" | "Done!";
};

export type TaskWithChildrenType = {
  id: number;
  name: string;
  description?: string;
  features: TaskWithChildrenType[] | TaskType[];
  status: "To Do" | "In Progress" | "Done!";
};

type Props = {
  task: TaskWithChildrenType;
};

const TaskWithChildren = ({ task }: Props) => {
  console.log("task", task);

  const toDoChildren = task.features.filter(
    (child) => child.status === "To Do"
  );
  const inProgressChildren = task.features.filter(
    (child) => child.status === "In Progress"
  );
  const doneChildren = task.features.filter(
    (child) => child.status === "Done!"
  );

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
          features={toDoChildren}
          columnName="To Do"
          projectId={task.id}
        />
        <ProgressColumn
          features={inProgressChildren}
          columnName="In Progress"
          projectId={task.id}
        />
        <ProgressColumn
          features={doneChildren}
          columnName="Done"
          projectId={task.id}
        />
      </Box>
      <Box mt={8}>
        <MyButton variant="outline">Add a feature</MyButton>
      </Box>
    </Section>
  );
};

export default TaskWithChildren;
