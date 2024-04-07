import { Box, Link } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import ReactPlayer from "react-player";
import Section from "../Components/Section";
import BodyHeading from "../Components/BodyHeading";
import Paragraph from "../Components/Paragraph";
import ReviewForm from "../Components/Reviews/ReviewForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { sessions } from "../Components/Resources/sessions";

const CallieSubmission = () => {
  const sessionId = useLoaderData() as any;
  const solutionLinks = sessions[sessionId - 1].solutionLinks;

  const otherLinks = solutionLinks?.filter((link) => link.type !== "video");
  const videos = solutionLinks?.filter((link) => link.type === "video");

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API || "http://localhost:3001/api"}/reviews`
      )
      .then((response) => {
        setReviews(response.data);
      });
  }, []);

  return (
    <Box>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading textAlignCenter={false}>
          {`Session ${sessionId}: ${sessions[sessionId - 1].title}`}
        </BodyHeading>
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
        {videos?.map((link) => {
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
        })}
        <ReviewForm
          reviews={reviews}
          setReviews={setReviews}
          isLargerThan900={false}
          sessionId={sessionId}
          title={`Review Session ${sessionId}: ${
            sessions[sessionId - 1].title
          }`}
        />
      </Section>
    </Box>
  );
};

export default CallieSubmission;
