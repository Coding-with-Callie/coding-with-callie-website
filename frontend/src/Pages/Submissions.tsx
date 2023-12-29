import { Box, Link, Text, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { SetStateAction, useState } from "react";
import { useLoaderData, useOutletContext, useParams } from "react-router-dom";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const submissions = useLoaderData() as Submission[];

  const context = useOutletContext() as Context;
  const userId = context.user.id;

  const data = useLoaderData() as Data[];

  const [sessionData, setSessionData] = useState(data);
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
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log("RESPONSE", response.data);
          setSessionData(response.data);
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
          {submissions.map((submission: Submission, index) => {
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
                    {sessionData[index].feedback.length}
                  </Box>
                </Box>
                <MyButton
                  onClick={() => {
                    onOpen();
                    setSubmissionId(submission.id);
                  }}
                  disabled={submission.user.id === userId}
                  widthSize="100%"
                >
                  Provide Feedback
                </MyButton>
              </Box>
            );
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
