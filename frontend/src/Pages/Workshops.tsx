import { Box, Heading, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BodyText from "../Components/BodyText";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";
const fullstack = require("../images/fullstack.png");

const todoListDetails = [
  "I currently offer 1 fullstack development workshop: Todo List!",
  "The workshop is completely self-paced with 10 assignments and corresponding solution videos.",
  "If you complete the workshop by April 11, 2024, you will be eligible to participate in Coding with Callie's first Interview Day!",
];

const workshops = [
  {
    name: "Project Planning Tool: Fullstack",
    description:
      "Build a fullstack project planning tool that you can subsequently use to plan all of your portfolio projects with React, ChakraUI, NestJS, and PostgreSQL.",
    available: true,
    image: fullstack,
    path: "todo-list",
  },
  {
    name: "Project Planning Tool: Deployment",
    description:
      "Deploy your Project Planning Tool with AWS, Kubernetes, Docker, Helm, Terraform, and more!",
    available: true,
    image: fullstack,
    path: "todo-list",
  },
  {
    name: "Project Planning Tool: Frontend",
    description:
      "Build the frontend of the project planning tool (using Callie's deployed backend) that you can subsequently use to plan all of your portfolio projects with React and ChakraUI.",
    available: true,
    image: fullstack,
    path: "todo-list",
  },
  {
    name: "Project Planning Tool: Backend",
    description:
      "Build the backend of the project planning tool (using Callie's deployed frontend) that you can subsequently use to plan all of your portfolio projects with NestJS and PostgreSQL.",
    available: true,
    image: fullstack,
    path: "todo-list",
  },
];

const Workshops = () => {
  return (
    <Section screenSizeParameter={false} alignItemsCenter={false}>
      <Heading fontSize={28} mb={6} color="#79A9CD" textAlign="center">
        Workshops
      </Heading>
      <Box display="flex" flexDirection="column" w="60%" gap={10}>
        {workshops.map((workshop) => {
          return (
            <Box
              backgroundColor="white"
              borderRadius={4}
              p={10}
              boxShadow="lg"
              flex={1}
              display="flex"
              flexDirection="column"
              gap={10}
              minW="400px"
            >
              <Heading fontSize={28} color="#79A9CD" textAlign="center">
                {workshop.name}
              </Heading>
              <Text flex={1}>{workshop.description}</Text>
              <Image src={workshop.image} boxShadow="lg" borderRadius={4} />
              <Box m="0 auto">
                <Link to={workshop.path}>
                  <MyButton>Learn More</MyButton>
                </Link>
              </Box>
            </Box>
          );
        })}
      </Box>
      <BodyText textBlocks={todoListDetails} textAlignCenter={true} />
      <Box display="flex" gap={10}>
        <Link to="todo-list">
          <MyButton>Todo List Workshop</MyButton>
        </Link>
      </Box>
    </Section>
  );
};

export default Workshops;
