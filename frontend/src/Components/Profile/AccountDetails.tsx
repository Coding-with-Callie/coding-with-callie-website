import { EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import EditableImage from "./EditableImage";

type Props = {
  user: {
    name: string;
    username: string;
    password: string;
    email: string;
    photo: string;
  };
};

const AccountDetails = ({ user }: Props) => {
  return (
    <Box>
      <EditableImage photo={user.photo} />
      <Box px={2}>
        <Box
          display="flex"
          justifyContent="space-between"
          mb={2}
          alignItems="center"
        >
          <Text layerStyle="text">Name: </Text>
          <Box display="flex" w="70%" alignItems="center">
            <Text layerStyle="text" flex={1}>
              {user.name}
            </Text>
            <IconButton
              aria-label="edit"
              icon={<EditIcon />}
              onClick={() => {}}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          mb={2}
          alignItems="center"
        >
          <Text layerStyle="text">Username: </Text>
          <Box display="flex" w="70%" alignItems="center">
            <Text layerStyle="text" flex={1}>
              {user.username}
            </Text>
            <IconButton
              aria-label="edit"
              icon={<EditIcon />}
              onClick={() => {}}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          mb={2}
          alignItems="center"
        >
          <Text layerStyle="text">Password: </Text>
          <Box display="flex" w="70%" alignItems="center">
            <Text layerStyle="text" flex={1}>
              ******
            </Text>
            <IconButton
              aria-label="edit"
              icon={<EditIcon />}
              onClick={() => {}}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          mb={2}
          alignItems="center"
        >
          <Text layerStyle="text">Email: </Text>
          <Box display="flex" w="70%" alignItems="center">
            <Text flex={1}>{user.email}</Text>
            <IconButton
              aria-label="edit"
              icon={<EditIcon />}
              onClick={() => {}}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountDetails;
