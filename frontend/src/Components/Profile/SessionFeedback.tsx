import { Box } from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";
import { Context } from "../../App";
import { Data } from "../../Pages/Profile";
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
};

const SessionFeedback = ({ sessionNumber, admin, data }: Props) => {
  const context: Context = useOutletContext();

  let currentUser;

  if (data) {
    currentUser = data;
  } else {
    currentUser = context.user as Data;
  }

  const submission = currentUser.submissions.find(
    (submission) => submission.session === sessionNumber
  );
  const feedback = currentUser.feedback.filter(
    (review) => review.submission.session === sessionNumber
  );

  if (submission || feedback.length > 0) {
    return (
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        {submission || feedback.length > 0 ? (
          <BodyHeading
            textAlignCenter={true}
          >{`Session ${sessionNumber}`}</BodyHeading>
        ) : null}

        {submission ? (
          <SubmissionInfo submission={submission} admin={admin} />
        ) : null}

        {submission && submission?.feedback.length > 0 ? (
          <Box mb={10} w="100%">
            <BodyHeading textAlignCenter={false}>Feedback Received</BodyHeading>

            {submission.feedback.map((feedback) => {
              return <FeedbackReceived feedback={feedback} />;
            })}
          </Box>
        ) : null}
        <Box mb={4} w="100%">
          {feedback.length > 0 ? (
            <>
              <BodyHeading textAlignCenter={false}>Feedback Given</BodyHeading>

              {feedback.map((feedback) => {
                return <FeedbackGiven feedback={feedback} admin={admin} />;
              })}
            </>
          ) : null}
        </Box>
      </Section>
    );
  } else {
    return null;
  }
};

export default SessionFeedback;
