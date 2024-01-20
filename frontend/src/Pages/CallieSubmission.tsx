import { Box, Link } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { sessions } from "../Components/Resources/sessions";
import ReactPlayer from "react-player";
import Section from "../Components/Section";
import BodyHeading from "../Components/BodyHeading";
import Paragraph from "../Components/Paragraph";

const CallieSubmission = () => {
  const sessionId = useLoaderData() as any;
  const solutionLinks = sessions[sessionId - 1].solutionLinks;

  const otherLinks = solutionLinks?.filter((link) => link.type !== "video");
  // const videos = solutionLinks?.filter((link) => link.type === "video");

  return (
    <Box>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading textAlignCenter={false}>
          {`Session ${sessionId}: ${sessions[sessionId - 1].title}`}
        </BodyHeading>
        <Box w="60%">
          <Paragraph>
            I decided to rework my Todo List and will record new videos this
            weekend! If you want to check in on my progress, take a look at my
            wireframe designs and trello board.
          </Paragraph>
        </Box>
        {otherLinks?.map((link) => {
          return (
            <Link
              href={link.link}
              target="_blank"
              color="#45446A"
              textDecoration="underline"
            >
              {link.label}
            </Link>
          );
        })}
        {/* {videos?.map((link) => {
          return (
            <Box w="75%">
              <Paragraph>{link.label}</Paragraph>
              <Box
                borderRadius="5px"
                mb={6}
                overflow="hidden"
                boxShadow="lg"
                mx="auto"
              >
                <ReactPlayer
                  url={link.link}
                  controls
                  width="100%"
                  height="100%"
                />
              </Box>
            </Box>
          );
        })} */}
      </Section>
    </Box>
  );
};

export default CallieSubmission;
