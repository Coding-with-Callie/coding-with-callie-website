import { Box } from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";
import { Context } from "../../App";
import { Data } from "../../Pages/Profile";
import BodyHeading from "../BodyHeading";
import Section from "../Section";
import FeedbackGiven from "./FeedbackGiven";
import FeedbackReceived from "./FeedbackReceived";

const SessionFeedback = () => {
  const context: Context = useOutletContext();

  const currentUser = context.user as Data;
  const submissions = currentUser.submissions;
  const feedback = currentUser.feedback;

  return (
    <Section screenSizeParameter={false} alignItemsCenter={false}>
      {submissions.map((submission) => {
        return (
          <Box w="100%">
            <BodyHeading
              textAlignCenter={true}
            >{`Session ${submission.session}`}</BodyHeading>
            <Box mt={20} mb={4}>
              <BodyHeading textAlignCenter={false}>
                Feedback Received
              </BodyHeading>
              {submission.feedback.map((feedback) => {
                return <FeedbackReceived feedback={feedback} />;
              })}
            </Box>
            <Box mt={20} mb={4}>
              <BodyHeading textAlignCenter={false}>Feedback Given</BodyHeading>
              {feedback.map((feedback) => {
                if (feedback.submission.session === submission.session) {
                  return <FeedbackGiven feedback={feedback} />;
                } else {
                  return null;
                }
              })}
            </Box>
          </Box>
        );
      })}
    </Section>
  );
};

export default SessionFeedback;
