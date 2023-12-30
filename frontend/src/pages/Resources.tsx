import { Box } from "@chakra-ui/react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
import { sessions } from "../Components/Resources/sessions";
import SessionTask from "../Components/Resources/SessionTask";
import Section from "../Components/Section";
import { Data, Feedback } from "./Profile";

const instructions = [
  "We will be building our Todo List application over the course of 10 weeks. I have broken the application into 10 corresponding tasks.",
  "Prior to each session, you'll need to attempt the task on your own. Once you give it your best shot, submit your deliverable on this page. Submitting your deliverable will unlock options to see other participants' submissions, and eventually my solution.",
  "During the in-person workshop, we'll spend a portion of the session brainstorming the task and reviewing each other's work in groups. In the latter portion of the in-person workshop, I will walk the group through how I would have completed the task.",
  "If you're going through the workshop asynchronously, you can review other participants' work and share feedback on here once you submit your own. I'll record my solution and post it on this page within 48 hours of the in-person session.",
];

const Resources = () => {
  const data = useLoaderData() as Data;
  const context: Context = useOutletContext();

  console.log("context", context);

  const feedback: Feedback[] = data.feedback;

  return (
    <>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading textAlignCenter={true}>Todo List Resources</BodyHeading>
        <BodyText textBlocks={instructions} textAlignCenter={false} />
      </Section>
      <Box>
        {sessions.map((session, index) => {
          const sessionFeedback = feedback.filter((feedback) => {
            return feedback.submission.session === index + 1;
          });

          return (
            <SessionTask
              session={session}
              index={index}
              userId={context.user.id}
              submissions={data.submissions}
              feedback={sessionFeedback}
            />
          );
        })}
      </Box>
    </>
  );
};

export default Resources;
