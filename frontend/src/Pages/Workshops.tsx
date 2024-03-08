import { Box, Heading, Text, Image } from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";
import BodyText from "../Components/BodyText";
const fullstack = require("../images/fullstack.png");

// const workshops = [
//   {
//     name: "Project Planning Tool: Fullstack",
//     description:
//       "Build a fullstack project planning tool that you can subsequently use to plan all of your portfolio projects with React, ChakraUI, NestJS, and PostgreSQL.",
//     available: true,
//     image: fullstack,
//     path: "todo-list",
//   },
//   {
//     name: "Project Planning Tool: Deployment",
//     description:
//       "Deploy your Project Planning Tool with AWS, Kubernetes, Docker, Helm, Terraform, and more!",
//     available: false,
//     image: fullstack,
//     path: "todo-list",
//   },
//   {
//     name: "Project Planning Tool: Frontend",
//     description:
//       "Build the frontend of the project planning tool (using Callie's deployed backend) that you can subsequently use to plan all of your portfolio projects with React and ChakraUI.",
//     available: false,
//     image: fullstack,
//     path: "todo-list",
//   },
//   {
//     name: "Project Planning Tool: Backend",
//     description:
//       "Build the backend of the project planning tool (using Callie's deployed frontend) that you can subsequently use to plan all of your portfolio projects with NestJS and PostgreSQL.",
//     available: false,
//     image: fullstack,
//     path: "todo-list",
//   },
// ];

const details = [
  "When I was learning to code, I spent a maximum of a week or two working on a single project. When I started my software engineering position, I realized how much my projects were lacking when it comes to: error handling, testing, logging, security, project management, documentation, etc.",
  "So, I thought I'd start a self-paced workshop where we build a relatively simple application, but spend the time making sure it is actually usable.",
  "Whenever I learn a new technology, I create a Todo List with it to make sure I understand the fundamentals. So, this is a great workshop to choose if you are new to NestJS!",
];

export type Workshop = {
  id: number;
  name: string;
  description: string;
  photo: string;
  details: string[];
  objectives: string[];
  techStack: string[];
  price: number;
};

const Workshops = () => {
  const workshops = useLoaderData() as Workshop[];

  return (
    <Section screenSizeParameter={false} alignItemsCenter={false}>
      <Heading fontSize={28} mb={6} color="#79A9CD" textAlign="center">
        Workshops
      </Heading>
      <BodyText textBlocks={details} textAlignCenter={false} />
      <Box display="flex" flexDirection="column" gap={10}>
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
            >
              <Heading fontSize={28} color="#79A9CD" textAlign="center">
                {workshop.name}
              </Heading>

              <Text color="#45446A">{workshop.description}</Text>

              <Image
                src={fullstack || workshop.photo}
                boxShadow="lg"
                borderRadius={4}
                objectFit="cover"
              />

              <Box m="0 auto">
                <Link to={`/workshops/${workshop.id}`}>
                  <MyButton>Learn More</MyButton>
                </Link>
              </Box>
            </Box>
          );
        })}
      </Box>
      {/* <BodyText textBlocks={todoListDetails} textAlignCenter={true} /> */}
      {/* <Box display="flex" gap={10}>
        <Link to="todo-list">
          <MyButton>Todo List Workshop</MyButton>
        </Link>
      </Box> */}
    </Section>
  );
};

export default Workshops;
