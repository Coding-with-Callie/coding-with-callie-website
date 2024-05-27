import { Box, Text } from "@chakra-ui/react";
import FeatureBox from "../Features/FeatureBox";
import CreateFeatureAccordion from "../Features/CreateFeatureAccordion";
import { Project } from "../../Pages/Projects";

export type Column = {
  name: string;
};

type Props = {
  column: Column;
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};

const StatusColumn = ({ column, project, setProject }: Props) => {
  return (
    <Box
      border="1px solid #45446A"
      borderRadius="md"
      backgroundColor="white"
      flex={1}
      key={column.name}
      minW="275px"
    >
      <Text layerStyle="text" textAlign="center" fontSize={20} mt={2}>
        {column.name}
      </Text>
      {project.features.map((feature) => {
        if (column.name === feature.status) {
          return (
            <FeatureBox
              feature={feature}
              projectId={project.id}
              setProject={setProject}
            />
          );
        } else {
          return null;
        }
      })}
      <Box p={4}>
        {column.name === "To Do" && (
          <CreateFeatureAccordion
            features={project.features}
            setProject={setProject}
            projectId={project.id}
          />
        )}
      </Box>
    </Box>
  );
};

export default StatusColumn;
