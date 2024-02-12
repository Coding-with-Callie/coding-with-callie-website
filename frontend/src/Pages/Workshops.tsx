import { Box, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";
import Paragraph from "../Components/Paragraph";

const todoListDetails = [
  "We are currently working our way through the Todo List Workshop!",
  "We meet on Thursdays (7PM - 9PM EST) via Zoom to go over some of the trickier parts of the project together. All Coding with Callie members are welcome to join the Zoom sessions.",
  "There are also dozens of how-to videos for each portion of the project for those who prefer to go through the course on their own!",
];

const deploymentDetails = [
  "I am still in the initial planning stages of the Fullstack Deployment Workshop.",
];

const Workshops = () => {
  return (
    <Section screenSizeParameter={false} alignItemsCenter={false}>
      <Heading fontSize={28} mb={6} color="#79A9CD" textAlign="center">
        Todo List Workshop
      </Heading>
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
