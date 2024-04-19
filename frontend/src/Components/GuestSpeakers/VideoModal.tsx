import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Box,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { Speaker } from "../../Pages/GuestSpeakers";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  speaker: Speaker;
};

const VideoModal = ({ isOpen, onClose, speaker }: Props) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{speaker.name}'s Session</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              borderRadius="5px"
              mb={6}
              overflow="hidden"
              boxShadow="lg"
              mx="auto"
            >
              <ReactPlayer
                url={speaker.sessionRecordingUrl}
                controls
                width="100%"
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VideoModal;
