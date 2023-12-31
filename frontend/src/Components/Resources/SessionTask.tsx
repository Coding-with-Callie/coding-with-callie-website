import {
  Box,
  Text,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { showNotification } from "../..";
import { Context } from "../../App";
import { Feedback } from "../../Pages/Profile";
import BodyHeading from "../BodyHeading";
import MyButton from "../MyButton";
import Section from "../Section";
import EditSubmissionModal from "./EditSubmissionModal";
import { Session } from "./sessions";

export type Submission = {
  id: number;
  session: number;
  url: string;
  user: any;
  feedback: any[];
};

type Props = {
  session: Session;
  index: number;
  userId: number;
  submissions: any;
  feedback: Feedback[];
};

const SessionTask = ({ session, index, userId, feedback }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context: Context = useOutletContext();

  const sessionSubmissions = context.user.submissions.filter(
    (submission: Submission) => submission.session === index + 1
  );

  const feedbackCount = feedback.length;

  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [submitted, setSubmitted] = useState(sessionSubmissions.length > 0);

  const submitDeliverable = () => {
    const token = localStorage.getItem("token");
    console.log("userId", userId);
    axios
      .post(
        `${
          process.env.REACT_APP_API || "http://localhost:3001/api"
        }/auth/submit-deliverable`,
        { session: index + 1, url, userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setSubmitted(true);
        showNotification("Your submission has been submitted!", "success");
        context.updateUser(response.data);
      })
      .catch((error) => {
        if (error.response.data.message === "Unauthorized") {
          showNotification(
            "It looks like your session has expired. Please log in again to view Coding with Callie resources!",
            "error"
          );
          navigate("/log-in");
        } else {
          let message = error.response.data.message;
          showNotification(`${message}`, "error");
        }
      });
  };

  const editDeliverable = () => {
    onClose();
    const token = localStorage.getItem("token");
    axios
      .post(
        `${
          process.env.REACT_APP_API || "http://localhost:3001/api"
        }/auth/edit-deliverable`,
        { session: index + 1, url, userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        showNotification("Your submission has been edited!", "success");
        context.updateUser(response.data);
      })
      .catch((error) => {
        if (error.response.data.message === "Unauthorized") {
          showNotification(
            "It looks like your session has expired. Please log in again to view Coding with Callie resources!",
            "error"
          );
          navigate("/log-in");
        } else {
          let message = error.response.data.message;
          showNotification(`${message}`, "error");
        }
      });
  };

  return (
    <>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading textAlignCenter={false}>
          {`Session ${index + 1}: ${session.title}`}
        </BodyHeading>
        <Box display="flex" flexDirection="column" gap={6}>
          <Box display="flex" justifyContent="space-between">
            <Text layerStyle="input" fontWeight="bold">
              Summary:
            </Text>
            <Text layerStyle="input" w="80%">
              {session.summary}
            </Text>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Text layerStyle="input" fontWeight="bold">
              Deliverable:
            </Text>
            <Text layerStyle="input" w="80%">
              {session.deliverable}
            </Text>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Text layerStyle="input" fontWeight="bold">
              Due Date:
            </Text>
            <Text layerStyle="input" w="80%">
              {session.dueDate}
            </Text>
          </Box>
          {submitted ? (
            <Box display="flex" justifyContent="space-between">
              <Text layerStyle="input" fontWeight="bold">
                Submission:
              </Text>
              <Text layerStyle="input" w="80%">
                {sessionSubmissions[0].url}
              </Text>
            </Box>
          ) : null}
          <Box display="flex" gap={2}>
            {submitted ? (
              <>
                <Box flex={1}>
                  <MyButton
                    widthSize="100%"
                    onClick={() => navigate(`/submissions/${index + 1}`)}
                  >
                    Participant submissions
                  </MyButton>
                </Box>
                <Box flex={1}>
                  <MyButton widthSize="100%" onClick={onOpen}>
                    Edit submission
                  </MyButton>
                </Box>
              </>
            ) : (
              <Box display="flex" flexDirection="column" gap={4} w="100%">
                <Input
                  layerStyle="input"
                  variant="filled"
                  placeholder="Paste a link to your deliverable here..."
                  onChange={(e: any) => {
                    setUrl(e.target.value);
                  }}
                />
                <MyButton onClick={submitDeliverable}>Submit</MyButton>
              </Box>
            )}
            {feedbackCount >= 2 ? (
              <Box flex={1}>
                <MyButton
                  widthSize="100%"
                  onClick={() => navigate(`/submissions/callie/${index + 1}`)}
                >
                  View Callie's Solution
                </MyButton>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Section>
      <EditSubmissionModal
        isOpen={isOpen}
        onClose={onClose}
        setUrl={setUrl}
        editDeliverable={editDeliverable}
      />
    </>
  );
};

export default SessionTask;
