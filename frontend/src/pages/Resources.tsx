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
          I will be building my Todo List application throughout the first
          quarter of 2024 and posting solution videos each week as I build out
          my features. There are 11 assignments and corresponding solution pages
          with hours worth of step-by-step videos.
        </Text>
        <Text color="#45446A" mb={4}>
          You can view the available videos by clicking on each assignment's{" "}
          <strong>View Callie's Solution</strong> button.
        </Text>
        <OrderedList color="#45446A" mb={4}>
          <ListItem>Planning a Project</ListItem>
          <ListItem>Setting A Project Up</ListItem>
          <ListItem>Feature 1</ListItem>
          <ListItem>Feature 2</ListItem>
          <ListItem>Feature 3</ListItem>
          <ListItem>Feature 4</ListItem>
          <ListItem>Feature 5</ListItem>
          <ListItem>Finish Remaining Tasks</ListItem>
          <ListItem>Logging</ListItem>
          <ListItem>Manual E2E Testing</ListItem>
          <ListItem>Automated Spec Testing</ListItem>
        </OrderedList>
        <Text color="#45446A" mb={4}>
          Each task has a summary of its requirements, the deliverable you must
          submit, and helpful links to kick off your work. Try to give the
          assignment your best shot before viewing the solution videos, but know
          that they're there if you get too stuck.
        </Text>
        <Text color="#45446A" mb={4}>
          Submitting your deliverable will unlock options to see and review
          other participants' submissions. Please note that an assignment is not
          "complete" until you submit your deliverable and review two other
          participant submissions. If you want a more detailed code review,
          consider joining our weekly meet-ups!
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
