import { Box } from "@chakra-ui/react";
import EditableImage from "./EditableImage";
import EditableText from "./EditableText";
import { useOutletContext } from "react-router-dom";
import { Context } from "../../App";

const AccountDetails = () => {
  const { user } = useOutletContext() as Context;

  return (
    <Box display="flex" flexDirection="column" gap={6} mb={6}>
      <EditableImage photo={user.photo} />
      <Box>
        <EditableText field="Name" value={user.name} />
        <EditableText field="Username" value={user.username} />
        <EditableText field="Email" value={user.email} />
      </Box>
    </Box>
  );
};

export default AccountDetails;
