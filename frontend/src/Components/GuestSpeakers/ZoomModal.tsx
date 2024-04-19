import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ZoomModal = ({ isOpen, onClose }: Props) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Coding with Callie Meet-up Zoom Link</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <a
              href="https://us06web.zoom.us/j/83354214189?pwd=cXkVLE5NnaetXOHyUq9rlo9wptVIja.1"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "underline" }}
            >
              https://us06web.zoom.us/j/83354214189?pwd=cXkVLE5NnaetXOHyUq9rlo9wptVIja.1
            </a>
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

export default ZoomModal;
