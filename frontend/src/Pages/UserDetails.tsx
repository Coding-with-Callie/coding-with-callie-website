import { Avatar, Box, useMediaQuery } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { Feedback, Submission } from "./Profile";
import SessionFeedback from "../Components/Profile/SessionFeedback";
import Paragraph from "../Components/Paragraph";
import Section from "../Components/Section";
import BodyHeading from "../Components/BodyHeading";

type UserData = {
  email: string;
  id: number;
  name: string;
  role: string;
  feedback: Feedback[];
  submissions: Submission[];
  username: string;
  photo: string | undefined;
};

const UserDetails = () => {
  const data = useLoaderData() as UserData;
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

  return (
    <>
      <Section screenSizeParameter={false} alignItemsCenter={true}>
        <BodyHeading
          textAlignCenter={true}
        >{`${data.name}'s Details`}</BodyHeading>
      </Section>
      <Box maxW="900px" margin="0 auto">
        <Section
          screenSizeParameter={isLargerThan600}
          alignItemsCenter={true}
          gapSize={isLargerThan600 ? 75 : 0}
        >
          <Box w="25%">
            <Avatar size="2xl" name={data.username} src={data.photo} />
          </Box>
          <Box w={isLargerThan600 ? "75%" : "100%"}>
            <Box px={2}>
              <Box
                display="flex"
                justifyContent="space-between"
                mb={2}
                alignItems="center"
              >
                <Paragraph margin={false}>Name: </Paragraph>
                <Box display="flex" w="70%" alignItems="center">
                  <Paragraph flexWeight={1} margin={false}>
                    {data.name}
                  </Paragraph>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                mb={2}
                alignItems="center"
              >
                <Paragraph margin={false}>Username: </Paragraph>
                <Box display="flex" w="70%" alignItems="center">
                  <Paragraph flexWeight={1} margin={false}>
                    {data.username}
                  </Paragraph>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                mb={2}
                alignItems="center"
              >
                <Paragraph margin={false}>Email: </Paragraph>
                <Box display="flex" w="70%" alignItems="center">
                  <Paragraph flexWeight={1} margin={false}>
                    {data.email}
                  </Paragraph>
                </Box>
              </Box>
            </Box>
          </Box>
        </Section>

        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sessionNumber) => {
          return <SessionFeedback sessionNumber={sessionNumber} admin={true} />;
        })}
      </Box>
    </>
  );
};

export default UserDetails;
