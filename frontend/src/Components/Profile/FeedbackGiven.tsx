import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Context } from "../../App";
import { Feedback } from "../../Pages/Profile";
import TextAreaInput from "../Forms/TextAreaInput";
import MyButton from "../MyButton";
import Paragraph from "../Paragraph";

type Props = {
  feedback: Feedback;
};

const FeedbackGiven = ({ feedback }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const context: Context = useOutletContext();

  const [positiveFeedback, setPositiveFeedback] = useState(
    feedback.positiveFeedback
  );
  const [immediateChangesRequested, setImmediateChangesRequested] = useState(
    feedback.immediateChangesRequested
  );
  const [longTermChangesRequested, setLongTermChangesRequested] = useState(
    feedback.longTermChangesRequested
  );
  const [submitClicked, setSubmitClicked] = useState(false);

  const editFeedback = () => {
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
          }/auth/edit-feedback`,
          {
            positiveFeedback,
            immediateChangesRequested,
            longTermChangesRequested,
            id: feedback.id,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          context.updateUser(response.data);
        });
    }
  };

  return (
    <>
      <Box
        mb={4}
        display="flex"
        flexDirection="column"
        gap={4}
        border="1px solid #45446A"
        borderRadius={4}
        backgroundColor="white"
        p={4}
        boxShadow="lg"
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Box display="flex" gap={2} flex={1}>
            <Paragraph bold margin={false}>
              You reviewed:
            </Paragraph>
            <Paragraph margin={false}>
              {feedback.submission.user.username}
            </Paragraph>
          </Box>
          <IconButton
            backgroundColor="#45446A"
            _hover={{ backgroundColor: "#363554" }}
            aria-label="edit"
            icon={<EditIcon color="#E1E7CD" />}
            onClick={() => {
              onOpen();
            }}
          />
        </Box>
        <Box>
          <Paragraph bold margin={false}>
            You wrote that they did the following well:
          </Paragraph>
          <Paragraph margin={false}>{feedback.positiveFeedback}</Paragraph>
        </Box>
        <Box>
          <Paragraph bold margin={false}>
            You requested the following immediate changes:
          </Paragraph>
          <Paragraph margin={false}>
            {feedback.immediateChangesRequested}
          </Paragraph>
        </Box>
        <Box>
          <Paragraph bold margin={false}>
            You requested the following long-term changes:
          </Paragraph>
          <Paragraph margin={false}>
            {feedback.longTermChangesRequested}
          </Paragraph>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submission Feedback</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" gap={6} flexDirection="column">
              <TextAreaInput
                field="What did you learn from reviewing this submission that you'd like to implement yourself?"
                onChange={(e: any) => {
                  setPositiveFeedback(e.target.value);
                }}
                value={positiveFeedback}
                isInvalid={submitClicked && positiveFeedback === ""}
              />
              <TextAreaInput
                field="What immediate modifications would you recommend be made to this submission? Why?"
                onChange={(e: any) => {
                  setImmediateChangesRequested(e.target.value);
                }}
                value={immediateChangesRequested}
                isInvalid={submitClicked && immediateChangesRequested === ""}
              />
              <TextAreaInput
                field="What long-term enhancements would you recommend be made to this submission? Why?"
                onChange={(e: any) => {
                  setLongTermChangesRequested(e.target.value);
                }}
                value={longTermChangesRequested}
                isInvalid={submitClicked && longTermChangesRequested === ""}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <MyButton onClick={editFeedback}>Edit</MyButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FeedbackGiven;
