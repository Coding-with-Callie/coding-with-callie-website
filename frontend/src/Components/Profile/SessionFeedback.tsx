import { Box } from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";
import { Context } from "../../App";
import { Data, Feedback, Submission } from "../../Pages/Profile";
import BodyHeading from "../BodyHeading";
import Section from "../Section";
import FeedbackGiven from "./FeedbackGiven";
import FeedbackReceived from "./FeedbackReceived";
import SubmissionInfo from "./SubmissionInfo";
import { UserData } from "../../Pages/UserDetails";

type Props = {
  sessionNumber: number;
  admin: boolean;
  data?: UserData;
  submission?: Submission;
  feedbackReceived: Feedback[];
  feedbackGiven: Feedback[];
};

const SessionFeedback = ({
  sessionNumber,
  admin,
  data,
  submission,
  feedbackReceived,
  feedbackGiven,
}: Props) => {
  if (submission) {
    return (
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading
          textAlignCenter={true}
        >{`Session ${sessionNumber}`}</BodyHeading>

        <SubmissionInfo submission={submission} admin={admin} />

        {feedbackReceived.length > 0 && (
          <Box mb={10} w="100%">
            <BodyHeading textAlignCenter={false}>Feedback Received</BodyHeading>

            {feedbackReceived.map((feedback, index) => {
              return (
                <Box key={index}>
                  <FeedbackReceived feedback={feedback} />
                </Box>
              );
            })}
          </Box>
        )}
        <Box mb={4} w="100%">
          {feedbackGiven.length > 0 && (
            <>
              <BodyHeading textAlignCenter={false}>Feedback Given</BodyHeading>

              {feedbackGiven.map((feedback, index) => {
                return (
                  <Box key={index}>
                    <FeedbackGiven feedback={feedback} admin={admin} />
                  </Box>
                );
              })}
            </>
          )}
        </Box>
      </Section>
    );
  } else {
    return null;
  }
};

export default SessionFeedback;
