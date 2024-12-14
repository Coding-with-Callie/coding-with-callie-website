import { Box, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const Feature = () => {
  const { id } = useParams();

  return (
    <Box>
      <Text>This is feature {id}</Text>
    </Box>
  );
};

export default Feature;
