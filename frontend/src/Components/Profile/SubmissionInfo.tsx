import { EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { showNotification } from "../..";
import { Context } from "../../App";
import BodyHeading from "../BodyHeading";
import Paragraph from "../Paragraph";
import EditSubmissionModal from "../Resources/EditSubmissionModal";
import { Submission } from "../Resources/SessionTask";

type Props = {
  submission: Submission;
  admin: boolean;
};

const SubmissionInfo = ({ submission, admin }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const context: Context = useOutletContext();

  const editDeliverable = () => {
    onClose();
    const token = localStorage.getItem("token");
    axios
      .post(
        `${
          process.env.REACT_APP_API || "http://localhost:3001/api"
        }/auth/edit-deliverable`,
        { session: submission.session, url, userId: submission.user.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        showNotification("Your submission has been edited!", "success");
        context.updateUser(response.data);
      })
      .catch((error) => {
        if (error.response.data.message === "Unauthorized") {
          showNotification(
            "It looks like your session has expired. Please log in again to view Coding with Callie resources!",
            "error"
          );
          navigate("/log-in");
        } else {
          let message: string = error.response.data.message[0];
          showNotification(`${message}`, "error");
        }
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
        <Box display="flex" alignItems="center" gap={2}>
          <Box display="flex" gap={2} flex={1}>
            <Paragraph bold margin={false}>
              Deliverable:
            </Paragraph>
            <Link
              href={submission.url}
              target="_blank"
              w="180px"
              isTruncated
              color="#45446A"
            >
              {submission.url}
            </Link>
          </Box>
          {!admin && (
            <IconButton
              backgroundColor="#45446A"
              _hover={{ backgroundColor: "#363554" }}
              aria-label="edit"
              icon={<EditIcon color="#E1E7CD" />}
              onClick={onOpen}
            />
          )}
        </Box>
      </Box>
      <EditSubmissionModal
        isOpen={isOpen}
        onClose={onClose}
        setUrl={setUrl}
        editDeliverable={editDeliverable}
      />
    </Box>
  );
};

export default SubmissionInfo;
