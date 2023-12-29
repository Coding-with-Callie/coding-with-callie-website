import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
} from "@chakra-ui/react";
import TextAreaInput from "../Forms/TextAreaInput";
import MyButton from "../MyButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setPositiveFeedback: React.Dispatch<React.SetStateAction<string>>;
  positiveFeedback: string;
  submitClicked: boolean;
  setImmediateChangesRequested: React.Dispatch<React.SetStateAction<string>>;
  immediateChangesRequested: string;
  setLongTermChangesRequested: React.Dispatch<React.SetStateAction<string>>;
  longTermChangesRequested: string;
  submitFeedback: () => void;
};

const FeedbackModal = ({
  isOpen,
  onClose,
  setPositiveFeedback,
  positiveFeedback,
  submitClicked,
  setImmediateChangesRequested,
  immediateChangesRequested,
  setLongTermChangesRequested,
  longTermChangesRequested,
  submitFeedback,
}: Props) => {
  return (
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
          <MyButton onClick={submitFeedback}>Submit</MyButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FeedbackModal;
