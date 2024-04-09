import { Box, Link } from "@chakra-ui/react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import ReactPlayer from "react-player";
import Section from "../Components/Section";
import BodyHeading from "../Components/BodyHeading";
import Paragraph from "../Components/Paragraph";
import ReviewForm from "../Components/Reviews/ReviewForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { Session } from "../Components/Resources/sessions";
import { Context } from "../App";

const CallieSubmission = () => {
  const context = useOutletContext() as Context;

  const session = useLoaderData() as Session;
  const solutionLinks = session.solutionLinks;

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
          {`Session ${session.id}: ${session.title}`}
        </BodyHeading>
        {otherLinks?.map((link: any) => {
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
        {videos?.map((link: any) => {
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
          sessionId={session.id}
          title={`Review Session ${session.id}: ${session.title}`}
          user={context.user}
        />
      </Section>
    </Box>
  );
};

export default CallieSubmission;
