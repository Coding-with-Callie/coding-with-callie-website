import { DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useRef } from "react";
import BodyHeading from "../BodyHeading";
import Paragraph from "../Paragraph";
import { Submission } from "../Resources/SessionTask";
import Alert from "./Alert";

type Props = {
  submission: Submission;
};

const SubmissionInfo = ({ submission }: Props) => {
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const deleteSubmission = () => {
    onCloseAlert();
    const token = localStorage.getItem("token");
    axios
      .post(
        `${
          process.env.REACT_APP_API || "http://localhost:3001/api"
        }/auth/delete-submission`,
        {
          id: submission.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        // context.updateUser(response.data);
      });
  };

  return (
    <Box mb={10} w="100%">
      <BodyHeading textAlignCenter={false}>Submission</BodyHeading>
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
        <Paragraph bold margin={false}>
          Deliverable:
        </Paragraph>
        <Paragraph margin={false}>{submission.url}</Paragraph>
        {/* <IconButton
          backgroundColor="#45446A"
          _hover={{ backgroundColor: "#363554" }}
          aria-label="edit"
          icon={<EditIcon color="#E1E7CD" />}
          onClick={() => {
            onOpen();
          }}
        /> */}
        <IconButton
          backgroundColor="#45446A"
          _hover={{ backgroundColor: "#363554" }}
          aria-label="edit"
          icon={<DeleteIcon color="#E1E7CD" />}
          onClick={onOpenAlert}
        />
      </Box>
      <Alert
        isOpenAlert={isOpenAlert}
        onCloseAlert={onCloseAlert}
        cancelRef={cancelRef}
        handleDelete={deleteSubmission}
        item="Submission"
      />
    </Box>
  );
};

export default SubmissionInfo;
