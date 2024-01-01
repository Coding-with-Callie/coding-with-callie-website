import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
} from "@chakra-ui/react";
import MyButton from "../MyButton";

type Props = {
  isOpenAlert: boolean;
  onCloseAlert: () => void;
  cancelRef: React.RefObject<HTMLButtonElement>;
  handleDelete: () => void;
  item: string;
};

const Alert = ({
  isOpenAlert,
  cancelRef,
  onCloseAlert,
  handleDelete,
  item,
}: Props) => {
  return (
    <AlertDialog
      isOpen={isOpenAlert}
      leastDestructiveRef={cancelRef}
      onClose={onCloseAlert}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold" color="#45446A">
            Delete {item}
          </AlertDialogHeader>

          <AlertDialogBody color="#45446A">
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter gap={2}>
            <Box
              as="button"
              backgroundColor="#E1E7CD"
              border="1px solid #45446A"
              color="#45446A"
              _hover={{
                borderColor: "#45446A",
                backgroundColor: "#45446A",
                color: "#E1E7CD",
              }}
              _active={{
                borderColor: "#45446A",
                backgroundColor: "#45446A",
                color: "#E1E7CD",
                transform: "scale(0.98)",
              }}
              p={2}
              borderRadius={4}
              ref={cancelRef}
              onClick={onCloseAlert}
            >
              Cancel
            </Box>
            <MyButton onClick={handleDelete}>Delete</MyButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Alert;
