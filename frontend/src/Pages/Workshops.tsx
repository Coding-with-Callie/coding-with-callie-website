import { Box, useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";

const workshopDetails = [
  "The Todo List Workshop begins on Thursday January 11, 2024.",
  "I am still in the initial planning stages of the Fullstack Deployment Workshop.",
];

const Workshops = () => {
  const [isLargerThan1090] = useMediaQuery("(min-width: 1090px)");

  return (
    <>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading textAlignCenter={true}>My Workshops</BodyHeading>
        <BodyText textBlocks={workshopDetails} textAlignCenter={true} />
      </Section>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <Box display="flex" gap={10}>
          <Link to="todo-list">
            <MyButton>Todo List Workshop</MyButton>
          </Link>
          <Link to="fullstack-deployment">
            <MyButton>Fullstack Deployment Workshop</MyButton>
          </Link>
        </Box>
      </Section>
    </>
  );
};

export default Workshops;
