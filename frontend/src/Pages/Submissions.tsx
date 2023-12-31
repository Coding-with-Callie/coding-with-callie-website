import { Box, Link, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import {
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { showNotification } from "..";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import MyButton from "../Components/MyButton";
import { Submission } from "../Components/Resources/SessionTask";
import Section from "../Components/Section";
import FeedbackModal from "../Components/Submissions/FeedbackModal";

type Data = {
  id: number;
  session: number;
  url: string;
  feedback: any[];
  user: any;
};

const Submissions = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const submissions = useLoaderData() as Submission[];

  const context = useOutletContext() as Context;
  const userId = context.user.id;

  const [sessionData, setSessionData] = useState(submissions);
  const [submissionId, setSubmissionId] = useState(0);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [positiveFeedback, setPositiveFeedback] = useState("");
  const [immediateChangesRequested, setImmediateChangesRequested] =
    useState("");
  const [longTermChangesRequested, setLongTermChangesRequested] = useState("");

  const submitFeedback = () => {
    setSubmitClicked(true);
    if (
      positiveFeedback !== "" &&
      immediateChangesRequested !== "" &&
      longTermChangesRequested !== ""
    ) {
      onClose();
      const token = localStorage.getItem("token");
      axios
        .post(
          `${
            process.env.REACT_APP_API || "http://localhost:3001/api"
          }/auth/submit-feedback`,
          {
            positiveFeedback,
            immediateChangesRequested,
            longTermChangesRequested,
            feedbackProviderId: userId,
            submissionId,
            sessionId: params.id,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setPositiveFeedback("");
          setImmediateChangesRequested("");
          setLongTermChangesRequested("");
          setSubmitClicked(false);
          showNotification("Your feedback has been submitted!", "success");
          setSessionData(response.data);
        })
        .catch((error) => {
          if (error.response.data.message === "Unauthorized") {
            showNotification(
              "It looks like your session has expired. Please log in again to view Coding with Callie resources!",
              "error"
            );
            navigate("/log-in");
          } else {
            let message: string = error.response.data.message[0];
            showNotification(`${message}`, "error");
          }
        });
    }
  };

  return (
    <Box>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading
          textAlignCenter={false}
        >{`Session ${params.id} Submissions`}</BodyHeading>
        <Box w="100%" display="flex" flexDirection="column" gap={6}>
          {sessionData.map((submission: Submission) => {
            const feedbackList = submission.feedback;
            const feedbackByUser = feedbackList.filter(
              (review) => review.user.id === userId
            );

            if (submission.user.id !== userId) {
              return (
                <Box
                  border="1px solid #45446A"
                  borderRadius={4}
                  p={6}
                  display="flex"
                  flexDirection="column"
                  gap={6}
                  backgroundColor="white"
                  boxShadow="lg"
                >
                  <Box display="flex" w="100%" alignItems="center">
                    <Text>{submission.user.username}</Text>
                    <Box textAlign="center" flex={1}>
                      <Link href={submission.url} target="_blank">
                        {submission.url}
                      </Link>
                    </Box>
                    <Tooltip label={`Number of submission reviews`}>
                      <Box
                        backgroundColor="#45446A"
                        color="white"
                        w="40px"
                        h="40px"
                        textAlign="center"
                        lineHeight="40px"
                        borderRadius="50%"
                        boxShadow="lg"
                      >
                        {submission?.feedback.length}
                      </Box>
                    </Tooltip>
                  </Box>
                  {feedbackByUser.length === 0 ? (
                    <MyButton
                      onClick={() => {
                        onOpen();
                        setSubmissionId(submission.id);
                      }}
                      widthSize="100%"
                    >
                      Provide Feedback
                    </MyButton>
                  ) : (
                    <Tooltip
                      label="You've already review this submission!"
                      shouldWrapChildren
                    >
                      <MyButton disabled={true} widthSize="100%">
                        Provide Feedback
                      </MyButton>
                    </Tooltip>
                  )}
                </Box>
              );
            } else {
              return null;
            }
          })}
        </Box>
      </Section>
      <FeedbackModal
        isOpen={isOpen}
        onClose={onClose}
        setPositiveFeedback={setPositiveFeedback}
        positiveFeedback={positiveFeedback}
        submitClicked={submitClicked}
        setImmediateChangesRequested={setImmediateChangesRequested}
        immediateChangesRequested={immediateChangesRequested}
        setLongTermChangesRequested={setLongTermChangesRequested}
        longTermChangesRequested={longTermChangesRequested}
        submitFeedback={submitFeedback}
      />
    </Box>
  );
};

export default Submissions;
