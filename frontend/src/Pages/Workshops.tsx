import { Box, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BodyText from "../Components/BodyText";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";

const todoListDetails = [
  "I currently offer 1 fullstack developer workshop: Todo List!",
  "The workshop is completely self-paced with 11 assignments and corresponding solution videos.",
  "If you complete the workshop by April 11, 2024, you will be eligible to participate in Coding with Callie's first Interview Day!",
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
