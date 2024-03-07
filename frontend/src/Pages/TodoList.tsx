import { Box, ListItem, UnorderedList, useMediaQuery } from "@chakra-ui/react";
import { Link, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";

const workshopDetails = [
  "When I was learning to code, I spent a maximum of a week or two working on a single project. When I started my software engineering position, I realized how much my projects were lacking when it comes to: error handling, testing, logging, security, project management, documentation, etc.",
  "So, I thought I'd start a self-paced workshop where we build a relatively simple application, but spend the time making sure it is actually usable.",
  "Whenever I learn a new technology, I create a Todo List with it to make sure I understand the fundamentals. So, this is a great workshop to choose if you are new to NestJS!",
];

const moreInformation = [
  "This workshop is self-paced. Complete the assignments as you have time and use my solution videos if you get stuck!",
  "For some extra motivation, if you complete the workshop by April 11, 2024, you will be eligible to participate in Coding with Callie's first Interview Day! During Interview Day, you will be interviewing for one of two open internships at Anchor Web Studio.",
  "You must be part of the Coding with Callie community to access to the workshop assignments, community feedback features, and the solution videos.",
];

const TodoList = () => {
  const [isLargerThan1090] = useMediaQuery("(min-width: 1090px)");

  const context: Context = useOutletContext();
  const loggedIn =
    context.user === null ? false : context.user.username !== undefined;
  const tokenExists = localStorage.getItem("token") !== null;

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
        gapSize={20}
        direction={isLargerThan1090 ? "row" : "column"}
      >
        <Box w="50%">
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
            <ListItem>
              Set up user account creation/maintenance securely
            </ListItem>
            <ListItem>Add logging to your backend service</ListItem>
            <ListItem>Test your backend service</ListItem>
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
          </UnorderedList>
        </Box>
      </Section>

      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading textAlignCenter={true}>More Information</BodyHeading>
        <BodyText textBlocks={moreInformation} textAlignCenter={true} />
        <Box display="flex" gap={10}>
          <Link
            to={loggedIn ? "/resources" : tokenExists ? "/log-in" : "/sign-up"}
          >
            <MyButton>
              {loggedIn
                ? "View Todo List Resources"
                : tokenExists
                  ? "Sign in"
                  : "Create an Account"}
            </MyButton>
          </Link>
          <Link to="/workshops">
            <MyButton>Return to Workshops</MyButton>
          </Link>
        </Box>
      </Section>
    </>
  );
};

export default TodoList;
