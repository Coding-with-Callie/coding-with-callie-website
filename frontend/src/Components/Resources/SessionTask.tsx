import { Box, Text, Input, useDisclosure, Link } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { showNotification } from "../..";
import { Context } from "../../App";
import BodyHeading from "../BodyHeading";
import MyButton from "../MyButton";
import Section from "../Section";
import EditSubmissionModal from "./EditSubmissionModal";
import { Session } from "./sessions";
import ReactPlayer from "react-player";

export type Submission = {
  id: number;
  session: number;
  url: string;
  user: any;
  feedback: any[];
};

type Props = {
  workshopId: number;
  session: Session;
  index: number;
  userId: number;
  submissions: any;
};

const SessionTask = ({ workshopId, session, index, userId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context: Context = useOutletContext();

  const sessionSubmissions = context.user.submissions.filter(
    (submission: Submission) => submission.session === index + 1
  );

  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [submitted, setSubmitted] = useState(sessionSubmissions.length > 0);

  const submitDeliverable = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${
          process.env.REACT_APP_API || "http://localhost:3001/api"
        }/auth/submit-deliverable`,
        {
          workshopId,
          session: index + 1,
          url,
          userId,
          videoDate: session.startDate,
        },
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
        { session: index + 1, url, userId, workshopId },
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
          {`Task ${index + 1}: ${session.title}`}
        </BodyHeading>
        {session.instructionVideo ? (
          <Box
            borderRadius="5px"
            w="60%"
            mb={6}
            overflow="hidden"
            boxShadow="lg"
          >
            <ReactPlayer
              url={session.instructionVideo}
              controls
              width="100%"
              height="100%"
            />
          </Box>
        ) : null}
        <Box display="flex" flexDirection="column" gap={6}>
          <Box display="flex">
            <Text layerStyle="input" fontWeight="bold" minW="145px">
              Summary:
            </Text>
            <Box>
              {session.summary.map((line, index) => {
                return (
                  <Text
                    layerStyle="input"
                    mb={index < session.summary.length - 1 ? 2 : 0}
                  >
                    {line}
                  </Text>
                );
              })}
            </Box>
          </Box>
          <Box display="flex">
            <Text layerStyle="input" fontWeight="bold" minW="145px">
              Deliverable:
            </Text>
            <Text layerStyle="input">{session.deliverable}</Text>
          </Box>
          {session.helpfulLinks ? (
            <Box display="flex">
              <Text layerStyle="input" fontWeight="bold" minW="145px">
                Resources:
              </Text>
              <Box display="flex" flexDirection="column" gap={3}>
                {session.helpfulLinks.map((link) => {
                  return (
                    <Link
                      href={link.link}
                      target="_blank"
                      color="#45446A"
                      textDecoration="underline"
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </Box>
            </Box>
          ) : null}
          {submitted ? (
            <Box display="flex">
              <Text layerStyle="input" fontWeight="bold" minW="145px">
                Submission:
              </Text>
              <Link
                href={sessionSubmissions[0].url}
                target="_blank"
                maxW="200px"
                isTruncated
                color="#45446A"
              >
                {sessionSubmissions[0].url}
              </Link>
            </Box>
          ) : null}
          <Box display="flex" gap={2}>
            {submitted ? (
              <>
                <Box flex={1}>
                  <MyButton
                    widthSize="100%"
                    onClick={() =>
                      navigate(`/submissions/${workshopId}/${index + 1}`)
                    }
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
          </Box>
          <Box>
            <MyButton
              widthSize="100%"
              onClick={() => navigate(`/submissions/callie/${index + 1}`)}
            >
              View Callie's Solution
            </MyButton>
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
