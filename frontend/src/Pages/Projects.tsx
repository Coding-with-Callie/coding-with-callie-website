import { Box, Heading, useMediaQuery } from "@chakra-ui/react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { Context } from "../App";
import TaskWithChildren, {
  TaskWithChildrenType,
} from "../Components/Projects/TaskWithChildren";

const Projects = () => {
  const data = useLoaderData() as TaskWithChildrenType[];
  const { user } = useOutletContext() as Context;
  const [isLargerThan825] = useMediaQuery("(min-width: 825px)");

  const [projects, setProjects] = useState(data);

  return (
    <Box mt={20}>
      <Heading textAlign="center" mb={4} fontSize={28} layerStyle="heading">
        {user.name}'s Projects
      </Heading>
      <Box my={10} mx={isLargerThan825 ? 10 : 4}>
        {projects.map((project) => {
          return <TaskWithChildren task={project} />;
        })}
      </Box>
    </Box>
  );
};

export default Projects;
