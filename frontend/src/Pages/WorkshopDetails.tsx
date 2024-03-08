import { Box, ListItem, UnorderedList, useMediaQuery } from "@chakra-ui/react";
import { Link, useLoaderData, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";
import { Workshop } from "./Workshops";

const moreInformation = [
  "This workshop is self-paced. Complete the assignments as you have time and use my solution videos if you get stuck!",
  "For some extra motivation, if you complete the workshop by April 11, 2024, you will be eligible to participate in Coding with Callie's first Interview Day! During Interview Day, you will be interviewing for one of two open internships at Anchor Web Studio.",
  "You must be part of the Coding with Callie community to access to the workshop assignments, community feedback features, and the solution videos.",
];

const WorkshopDetails = () => {
  const workshop = useLoaderData() as Workshop;
  console.log("WORKSHOP", workshop);
  const [isLargerThan1090] = useMediaQuery("(min-width: 1090px)");

  const context: Context = useOutletContext();
  const loggedIn =
    context.user === null ? false : context.user.username !== undefined;
  const tokenExists = localStorage.getItem("token") !== null;

  return (
    <>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading textAlignCenter={true}>
          {`${workshop.name} Workshop Details`}
        </BodyHeading>
        <BodyText textBlocks={workshop.details} textAlignCenter={true} />
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
            {workshop.objectives.map((objective) => {
              return <ListItem>{objective}</ListItem>;
            })}
          </UnorderedList>
        </Box>
        <Box>
          <BodyHeading textAlignCenter={!isLargerThan1090}>
            To build this application, I will be using:
          </BodyHeading>
          <UnorderedList color="#45446A">
            {workshop.techStack.map((tool) => {
              return <ListItem>{tool}</ListItem>;
            })}
          </UnorderedList>
        </Box>
      </Section>

      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading textAlignCenter={true}>More Information</BodyHeading>
        <BodyText textBlocks={moreInformation} textAlignCenter={true} />
        <Box display="flex" gap={10}>
          <MyButton>Add to Cart</MyButton>
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

export default WorkshopDetails;
