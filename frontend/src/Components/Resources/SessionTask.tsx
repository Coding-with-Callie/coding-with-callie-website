import { Box, Text, Input } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BodyHeading from "../BodyHeading";
import MyButton from "../MyButton";
import Section from "../Section";
import { Session } from "./sessions";

export type Submission = {
  id: number;
  session: number;
  url: string;
  user: any;
};

type Props = {
  session: Session;
  index: number;
  userId: number;
  submissions: any;
};

const SessionTask = ({ session, index, userId, submissions }: Props) => {
  const sessionSubmissions = submissions.filter(
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
        { session: index + 1, url, userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setSubmitted(true);
        console.log("RESPONSE", response.data);
      });
  };

  return (
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
        <Box display="flex" flexDirection="column" gap={4}>
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
        {submitted ? (
          <Box>
            <MyButton onClick={() => navigate(`/submissions/${index + 1}`)}>
              Participant submissions
            </MyButton>
          </Box>
        ) : null}
      </Box>
    </Section>
  );
};

export default SessionTask;
