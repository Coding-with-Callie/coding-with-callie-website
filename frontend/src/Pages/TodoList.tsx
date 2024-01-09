import {
  Box,
  ListItem,
  UnorderedList,
  useMediaQuery,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";
import { WarningIcon } from "@chakra-ui/icons";

const workshopDetails = [
  "When I was learning to code, I spent a maximum of a week or two working on a single project. When I started my software engineering position, I realized how much my projects were lacking when it comes to: error handling, testing, logging, security, project management, documentation, etc.",
  "So, I thought I'd start a 10-week workshop where we build a relatively simple application, but spend the time making sure it is actually usable.",
  "Whenever I learn a new technology, I create a Todo List with it to make sure I understand the fundamentals. So, that's what we are going to start with!",
];

const moreInformation = [
  "I am no longer accepting applications for the Todo List workshop. However, you can still participate! The first assignment for the workshop will be posted on January 11, 2024.",
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
        justifyContentCenter={true}
        gapSize={20}
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
            <ListItem>Add logging to your backend service</ListItem>
            <ListItem>Test your backend service</ListItem>
            <ListItem>
              <Text as="s">Deploy your application</Text>
            </ListItem>
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
            <ListItem>
              <Text as="s">AWS</Text>
            </ListItem>
          </UnorderedList>
        </Box>
      </Section>
      <Box
        display="flex"
        gap={isLargerThan1090 ? 3 : 1}
        mt={4}
        mx={10}
        justifyContent="center"
        textAlign="center"
      >
        <WarningIcon color="#45446A" mt={1} />
        <Text color="#45446A">
          We will not have enough time to complete a quality deployment. I will
          plan to hold a{" "}
          <ChakraLink
            href="/workshop-details/fullstack-deployment"
            display="inline"
          >
            Deployment Workshop
          </ChakraLink>{" "}
          next!
        </Text>
      </Box>
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
