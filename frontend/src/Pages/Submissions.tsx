import {
  Box,
  Button,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useLoaderData, useOutletContext, useParams } from "react-router-dom";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import TextInput from "../Components/Forms/TextInput";
import MyButton from "../Components/MyButton";
import { Submission } from "../Components/Resources/SessionTask";
import Section from "../Components/Section";

const Submissions = () => {
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const submissions = useLoaderData() as Submission[];

  const context = useOutletContext() as Context;
  const userId = context.user.id;
  console.log("CONTEXT", userId);

  return (
    <Box>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading
          textAlignCenter={false}
        >{`Session ${params.id} Submissions`}</BodyHeading>
        <Box w="100%" display="flex" flexDirection="column" gap={6}>
          {submissions.map((submission: Submission) => {
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
                <MyButton
                  onClick={onOpen}
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submission Feedback</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" gap={6} flexDirection="column">
              <TextInput
                field="What did you learn from reviewing this submission that you'd like to implement yourself?"
                onChange={undefined}
                value={""}
                isInvalid={undefined}
              />
              <TextInput
                field="What immediate modifications would you recommend be made to this submission? Why"
                onChange={undefined}
                value={""}
                isInvalid={undefined}
              />
              <TextInput
                field="What long-term enhancements would you recommend be made to this submission? Why"
                onChange={undefined}
                value={""}
                isInvalid={undefined}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Submissions;
