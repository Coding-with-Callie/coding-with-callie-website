import { Box, ListItem, UnorderedList, useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";

const workshopDetails = [
  "When I was learning to code, I spent a maximum of a week or two working on a single project. When I started my software engineering position, I realized how much my projects were lacking when it comes to: error handling, testing, logging, security, deployment, scaling, project management, documentation, etc.",
  "So, I thought I'd start a 10-week workshop where we build a relatively simple application, but spend the time making sure it is actually usable.",
  "Whenever I learn a new technology, I create a Todo List with it to make sure I understand the fundamentals. So, that's what we are going to start with!",
];

const moreInformation = [
  "I am no longer accepting applications for the Todo List workshop. However, you can still participate! The first assignment for the workshop will be posted on January 11, 2024.",
  "Please join the Coding with Callie community for access to the workshop assignments, community feedback features, and the solution videos.",
];

const WorkshopDetails = () => {
  const [isLargerThan1090] = useMediaQuery("(min-width: 1090px)");

  return (
    <>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading textAlignCenter={true}>
          Todo List Workshop Details
        </BodyHeading>
        <BodyText textBlocks={workshopDetails} textAlignCenter={true} />
      </Section>
      <Section
        screenSizeParameter={isLargerThan1090}
        alignItemsCenter={false}
        justifyContentCenter={true}
        gapSize={20}
      >
        <Box>
          <BodyHeading textAlignCenter={!isLargerThan1090}>
            You can expect to learn how to:
          </BodyHeading>
          <UnorderedList color="#45446A">
            <ListItem>
              Plan a project and split dev work into doable tasks
            </ListItem>
            <ListItem>
              Create an API that communicates with a UI and database
            </ListItem>
            <ListItem>Style your UI with a components library</ListItem>
            <ListItem>Add logging to your backend service</ListItem>
            <ListItem>Test your backend service</ListItem>
            <ListItem>Deploy your application</ListItem>
          </UnorderedList>
        </Box>
        <Box>
          <BodyHeading textAlignCenter={!isLargerThan1090}>
            To build this application, I will be using:
          </BodyHeading>
          <UnorderedList color="#45446A">
            <ListItem>TypeScript</ListItem>
            <ListItem>React</ListItem>
            <ListItem>React Router</ListItem>
            <ListItem>Chakra UI</ListItem>
            <ListItem>Node</ListItem>
            <ListItem>NestJS</ListItem>
            <ListItem>PostgreSQL with TypeORM</ListItem>
            <ListItem>AWS</ListItem>
          </UnorderedList>
        </Box>
      </Section>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading textAlignCenter={true}>More Information</BodyHeading>
        <BodyText textBlocks={moreInformation} textAlignCenter={true} />
        <Box display="flex" gap={4}>
          <Link to="/sign-up">
            <MyButton>Create an Account</MyButton>
          </Link>
          <Link to="/resources">
            <MyButton>View Workshop Resources</MyButton>
          </Link>
        </Box>
      </Section>
    </>
  );
};

export default WorkshopDetails;
