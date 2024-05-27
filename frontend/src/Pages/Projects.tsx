import { Box, Heading, useMediaQuery } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { Data } from "./Profile";
import CreateProjectAccordion from "../Components/Projects/CreateProjectAccordion";
import { useState } from "react";
import { Feature } from "./Project";
import ProjectBox from "../Components/Projects/ProjectBox";

export type Project = {
  id: number;
  name: string;
  description?: string;
  status: string;
  features: Feature[];
};

type LoaderData = {
  user: Data;
  projects: Project[];
};

const Projects = () => {
  const data = useLoaderData() as LoaderData;
  const user = data.user as Data;
  const [isLargerThan825] = useMediaQuery("(min-width: 825px)");

  const [projects, setProjects] = useState(data.projects);

  return (
    <Box mt={20}>
      <Heading textAlign="center" mb={4} fontSize={28} layerStyle="heading">
        {user.name}'s Projects
      </Heading>
      <Box my={10} mx={isLargerThan825 ? 10 : 4}>
        {projects.map((project) => {
          return <ProjectBox project={project} />;
        })}
        <CreateProjectAccordion projects={projects} setProjects={setProjects} />
      </Box>
    </Box>
  );
};

export default Projects;
