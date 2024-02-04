import { Avatar, Box, Heading, Text } from "@chakra-ui/react";
import Section from "../Section";
import BodyHeading from "../BodyHeading";
import Paragraph from "../Paragraph";
import { useEffect, useState } from "react";
import axios from "axios";
import { sessions } from "../Resources/sessions";
import { useNavigate } from "react-router-dom";

export type User = {
  email: string;
  id: number;
  name: string;
  password: string;
  photo: string | null;
  role: string;
  username: string;
};

export type SubmissionsCount = {
  session: number;
  count: number;
};

export type FeedbackCount = {
  session: number;
  count: number;
};

const Admin = () => {
  const navigate = useNavigate();

  const [submissionsCount, setSubmissionsCount] =
    useState<SubmissionsCount[]>();
  const [feedbackCount, setFeedbackCount] = useState<
    FeedbackCount[] | undefined[]
  >();
  const [reviewCount, setReviewCount] = useState(0);
  const [users, setUsers] = useState<User[]>([
    {
      email: "",
      id: 1,
      name: "",
      password: "",
      photo: "",
      role: "",
      username: "",
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(
        `${
          process.env.REACT_APP_API || "http://localhost:3001/api"
        }/auth/adminData`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const feedbackCount = response.data.feedbackCount;
        const feedback: any = [];

        const submissionsCount = response.data.submissionsCount;
        const submissions: any = [];

        const reviewCount = response.data.reviewCount;

        sessions.forEach((session, index) => {
          feedback.push({
            session: session.title,
            count: parseInt(feedbackCount[index + 1]) || 0,
          });
          submissions.push({
            session: session.title,
            count: parseInt(submissionsCount[index + 1]) || 0,
          });
        });

        setFeedbackCount(feedback);
        setSubmissionsCount(submissions);
        setReviewCount(reviewCount);

        setUsers(
          response.data.users.filter((user: User) => user.name !== "deleted")
        );
      });
  }, []);

  return (
    <Section screenSizeParameter={false} alignItemsCenter={false}>
      <BodyHeading textAlignCenter={false}>Admin</BodyHeading>
      <Box w="100%">
        <BodyHeading textAlignCenter={false}>Reviews</BodyHeading>
        <Box display="flex" alignItems="center" mb={2}>
          <Text w="275px" color="#45446A">
            Todo List Workshop:
          </Text>
          <Text color="#45446A">{`${reviewCount}`}</Text>
        </Box>
      </Box>
      <Box
        w="100%"
        display="flex"
        flexWrap="wrap"
        mt={6}
        gap={6}
        justifyContent="space-between"
      >
        <Box>
          <BodyHeading textAlignCenter={false}>Submissions</BodyHeading>
          <Box>
            {submissionsCount?.map((session) => {
              return (
                <Box>
                  {session && (
                    <Box display="flex" alignItems="center" mb={2}>
                      <Text
                        w="275px"
                        color="#45446A"
                      >{`${session.session}: `}</Text>
                      <Text color="#45446A">{`${session.count}`}</Text>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box>
          <BodyHeading textAlignCenter={false}>Feedback</BodyHeading>
          <Box>
            {feedbackCount?.map((session) => {
              return (
                <Box>
                  {session && (
                    <Box display="flex" alignItems="center" mb={2}>
                      <Text
                        w="275px"
                        color="#45446A"
                      >{`${session.session}: `}</Text>
                      <Text color="#45446A">{`${session.count}`}</Text>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
      <Box w="100%" mt={6}>
        <BodyHeading textAlignCenter={false}>Users:</BodyHeading>
        <Box display="flex" alignItems="center" mb={2}>
          <Text w="275px" color="#45446A">
            Todo List Workshop:
          </Text>
          <Text color="#45446A">{`${users.length}`}</Text>
        </Box>
      </Box>
      <Box display="flex" flexWrap="wrap" mt={6}>
        {users.map((user) => {
          return (
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              w="33.3%"
              mb={5}
              as="button"
              onClick={() => navigate(`/user-details/${user.id}`)}
            >
              <Avatar name={user.name} src={user.photo ? user.photo : ""} />
              <Paragraph margin={false}>{user.name}</Paragraph>
            </Box>
          );
        })}
      </Box>
    </Section>
  );
};

export default Admin;
