import { Box, ListItem, OrderedList, Text } from "@chakra-ui/react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import { sessions } from "../Components/Resources/sessions";
import SessionTask from "../Components/Resources/SessionTask";
import Section from "../Components/Section";
import { Data, Feedback } from "./Profile";

const Resources = () => {
  const data = useLoaderData() as Data;
  const context: Context = useOutletContext();

  const role = context.user.role;

  const feedback: Feedback[] = data.feedback;

  return (
    <>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading textAlignCenter={true}>Todo List Resources</BodyHeading>
        <Text color="#45446A" mb={4}>
          We will be building our Todo List application over the course of 10
          weeks. I have broken the application into 10 corresponding tasks.
        </Text>
        <OrderedList color="#45446A" mb={4}>
          <ListItem>Planning a Project</ListItem>
          <ListItem>Setting A Project Up</ListItem>
          <ListItem>Feature 1</ListItem>
          <ListItem>Feature 2</ListItem>
          <ListItem>Feature 3</ListItem>
          <ListItem>Feature 4</ListItem>
          <ListItem>Feature 5</ListItem>
          <ListItem>Logging</ListItem>
          <ListItem>Manual E2E Testing</ListItem>
          <ListItem>Automated Spec Testing</ListItem>
        </OrderedList>
        <Text color="#45446A" mb={4}>
          Prior to each session, you'll need to attempt the task on your own.
          Each task has a summary of its requirements, the deliverable you must
          submit, and the date on which the deliverable is due. Once you give it
          your best shot, submit your deliverable on this page. Submitting your
          deliverable will unlock options to see other participants'
          submissions, and eventually my solution.
        </Text>
        <Text color="#45446A" mb={4}>
          During the in-person workshop, we'll spend a portion of the session
          brainstorming the task and reviewing each other's work in groups. In
          the latter portion of the in-person workshop, I will walk the group
          through how I would have completed the task.
        </Text>
        <Text color="#45446A" mb={4}>
          If you're going through the workshop asynchronously, you can review
          other participants' work and share feedback on here once you submit
          your own. I'll record my solution and post it on this page within 48
          hours of the in-person session.
        </Text>
      </Section>
      <Box>
        {sessions.map((session, index) => {
          const sessionFeedback = feedback.filter((feedback) => {
            return feedback.submission.session === index + 1;
          });

          const today = new Date();
          const startDate = new Date(session.startDate);

          if (today > startDate || role === "admin") {
            return (
              <SessionTask
                session={session}
                index={index}
                userId={context.user.id}
                submissions={data.submissions}
                feedback={sessionFeedback}
              />
            );
          } else {
            return null;
          }
        })}
      </Box>
    </>
  );
};

export default Resources;
