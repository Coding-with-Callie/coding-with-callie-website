import { Box, Text } from "@chakra-ui/react";
import { Project } from "../../Pages/Projects";
import Section from "../Section";
import BodyHeading from "../BodyHeading";
import MyButton from "../MyButton";
import ProgressColumn from "./ProgressColumn";

type Props = {
  project: Project;
};

const ProjectBox = ({ project }: Props) => {
  const toDoFeatures = project.features.filter(
    (feature) => feature.status === "To Do"
  );
  const inProgressFeatures = project.features.filter(
    (feature) => feature.status === "In Progress"
  );
  const doneFeatures = project.features.filter(
    (feature) => feature.status === "Done!"
  );

  return (
    <Section>
      <BodyHeading>{project.name}</BodyHeading>
      <Text mb={6}>{project.description}</Text>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        gap={4}
      >
        <ProgressColumn
          features={toDoFeatures}
          columnName="To Do"
          projectId={project.id}
        />
        <ProgressColumn
          features={inProgressFeatures}
          columnName="In Progress"
          projectId={project.id}
        />
        <ProgressColumn
          features={doneFeatures}
          columnName="Done"
          projectId={project.id}
        />
      </Box>
      <Box mt={8}>
        <MyButton variant="outline">Add a feature</MyButton>
      </Box>
    </Section>
  );
};

export default ProjectBox;
