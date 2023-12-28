import { Box, Link, Text } from "@chakra-ui/react";
import { useLoaderData, useParams } from "react-router-dom";
import BodyHeading from "../Components/BodyHeading";
import MyButton from "../Components/MyButton";
import { Submission } from "../Components/Resources/SessionTask";
import Section from "../Components/Section";

const Submissions = () => {
  const params = useParams();
  const submissions = useLoaderData() as Submission[];

  return (
    <Box>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading
          textAlignCenter={false}
        >{`Session ${params.id} Submissions`}</BodyHeading>
        <Box w="100%" display="flex" flexDirection="column" gap={6}>
          {submissions.map((submission: any) => {
            return (
              <Box
                border="1px solid #45446A"
                borderRadius={4}
                p={6}
                display="flex"
                flexDirection="column"
                gap={6}
                backgroundColor="white"
              >
                <Box display="flex" w="100%">
                  <Text w="25%">{submission.user.username}</Text>
                  <Box w="75%">
                    <Link href={submission.url} target="_blank">
                      {submission.url}
                    </Link>
                  </Box>
                </Box>
                <MyButton widthSize="100%">Provide Feedback</MyButton>
              </Box>
            );
          })}
        </Box>
      </Section>
    </Box>
  );
};

export default Submissions;
