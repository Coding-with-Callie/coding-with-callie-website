import {
  Button,
  Modal,
  Box,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  itemType: "account" | "project" | "feature" | "user story";
  deleteItem: () => void;
};

const DeleteModal = ({ isOpen, onClose, itemType, deleteItem }: Props) => {
  const getAssociatedItems = () => {
    if (itemType === "account") {
      return "projects, features, user stories, and developer tasks";
    } else if (itemType === "project") {
      return "features, user stories, and developer tasks";
    } else if (itemType === "feature") {
      return "user stories and developer tasks";
    } else {
      return "developer tasks";
    }
  };

  const capitlizeItemType = () => {
    if (itemType === "account") {
      return "Account";
    } else if (itemType === "project") {
      return "Project";
    } else if (itemType === "feature") {
      return "Feature";
    } else {
      return "User Story";
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pt={20} pb={10} px={10} minW="50%">
          <ModalCloseButton />
          <Box mb={10}>
            <Text
              mb={10}
              textAlign="center"
              fontSize={20}
              layerStyle="text"
            >{`Are you sure you want to delete this ${itemType}?`}</Text>
            <Text
              textAlign="center"
              fontSize={20}
              layerStyle="text"
            >{`You will be permanently deleting all associated ${getAssociatedItems()}.`}</Text>
          </Box>
          <Button
            onClick={deleteItem}
            colorScheme="green"
          >{`Delete ${capitlizeItemType()}`}</Button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
