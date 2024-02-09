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
          We will be building our Todo List application throughout the first
          quarter of 2024. I have broken the application into 11 corresponding
          tasks.
        </Text>
        <OrderedList color="#45446A" mb={4}>
          <ListItem>
            Planning a Project{" "}
            <Box>
              - Zoom Session: {sessions[0].zoomSession || sessions[0].startDate}
            </Box>
          </ListItem>
          <ListItem>
            Setting A Project Up
            <Box>
              - Zoom Session: {sessions[1].zoomSession || sessions[1].startDate}
            </Box>
          </ListItem>
          <ListItem>
            Feature 1
            <Box>
              - Zoom Session: {sessions[2].zoomSession || sessions[2].startDate}
            </Box>
          </ListItem>
          <ListItem>
            Feature 2
            <Box>
              - Zoom Session: {sessions[3].zoomSession || sessions[3].startDate}
            </Box>
          </ListItem>
          <ListItem>
            Feature 3
            <Box>
              - Zoom Session: {sessions[4].zoomSession || sessions[4].startDate}
            </Box>
          </ListItem>
          <ListItem>
            Feature 4
            <Box>
              - Zoom Session: {sessions[5].zoomSession || sessions[5].startDate}
            </Box>
          </ListItem>
          <ListItem>
            Feature 5
            <Box>
              - Zoom Session: {sessions[6].zoomSession || sessions[6].startDate}
            </Box>
          </ListItem>
          <ListItem>
            Finish Remaining Tasks
            <Box>
              - Zoom Session: {sessions[7].zoomSession || sessions[7].startDate}
            </Box>
          </ListItem>
          <ListItem>
            Logging
            <Box>
              - Zoom Session: {sessions[8].zoomSession || sessions[8].startDate}
            </Box>
          </ListItem>
          <ListItem>
            Manual E2E Testing
            <Box>
              - Zoom Session: {sessions[9].zoomSession || sessions[9].startDate}
            </Box>
          </ListItem>
          <ListItem>
            Automated Spec Testing{" "}
            <Box>
              - Zoom Session:{" "}
              {sessions[10].zoomSession || sessions[10].startDate}
            </Box>
          </ListItem>
        </OrderedList>
        <Text color="#45446A" mb={4}>
          Each task has a summary of its requirements, the deliverable you must
          submit, and the date on which the deliverable is due. Once you give it
          your best shot, submit your deliverable on this page. Submitting your
          deliverable will unlock options to see and review other participants'
          submissions.
        </Text>
        <Text color="#45446A" mb={4}>
          In each week's Zoom session, I'll show you how I would complete the
          trickiest parts of that week's assignment. We'll go over the task's
          requirements and you can ask any questions you have. During the week
          that follows the Zoom session, you will give the task your best shot.
        </Text>
        <Text color="#45446A" mb={4}>
          I will be building the Todo List at the same time. I'll record my
          coding time and post videos as I work through the task. You can view
          the available videos by clicking on the task's{" "}
          <strong>View Callie's Solution</strong> button.
        </Text>
      </Section>
      <Box>
        {sessions.map((session, index) => {
          const sessionFeedback = feedback.filter((feedback) => {
            return feedback.submission.session === index + 1;
          });

          const today = new Date();
          const startDate = new Date(session.startDate);
          const videoDate = new Date(session.videoDate);
          const solutionVideoPosted = today > videoDate;

          if (today > startDate || role === "admin") {
            return (
              <SessionTask
                session={session}
                index={index}
                userId={context.user.id}
                submissions={data.submissions}
                feedback={sessionFeedback}
                solutionVideoPosted={solutionVideoPosted}
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
