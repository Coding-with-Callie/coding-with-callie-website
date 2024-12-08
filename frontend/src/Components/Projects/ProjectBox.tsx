import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../Pages/Projects";

type Props = {
  project: Project;
};

const ProjectBox = ({ project }: Props) => {
  const navigate = useNavigate();
  const [isLargerThan825] = useMediaQuery("(min-width: 825px)");

  const goToProject = (id: number) => {
    navigate(`/project/${id}`);
  };

  return (
    <Box
      display="flex"
      flexDirection={isLargerThan825 ? "row" : "column"}
      gap={isLargerThan825 ? 0 : 4}
      p={4}
      mb={6}
      onClick={() => {
        goToProject(project.id);
      }}
      key={project.id}
      layerStyle="boxButton"
    >
      <Text
        w={isLargerThan825 ? "15%" : "100%"}
        fontWeight={isLargerThan825 ? "normal" : "bold"}
        order={1}
      >
        {project.name}
      </Text>
      <Text
        noOfLines={isLargerThan825 ? 1 : 100}
        flex={1}
        order={isLargerThan825 ? 2 : 3}
      >
        {project.description}
      </Text>
      <Text
        w={isLargerThan825 ? "15%" : "100%"}
        ml={isLargerThan825 ? 10 : 0}
        order={isLargerThan825 ? 3 : 2}
      >
        {project.status}
      </Text>
    </Box>
  );
};

export default ProjectBox;
