import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Box,
} from "@chakra-ui/react";
import MyButton from "../MyButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  editDeliverable: () => void;
};

const EditSubmissionModal = ({
  isOpen,
  onClose,
  setUrl,
  editDeliverable,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Submission</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display="flex" flexDirection="column" gap={4} mb={2}>
            <Input
              layerStyle="input"
              variant="filled"
              placeholder="Paste a link to your deliverable here..."
              onChange={(e: any) => {
                setUrl(e.target.value);
              }}
            />
            <MyButton onClick={editDeliverable}>Submit</MyButton>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditSubmissionModal;
