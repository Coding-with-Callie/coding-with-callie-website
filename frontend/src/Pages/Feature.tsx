import { Box, Text } from "@chakra-ui/react";
import { useLoaderData, useParams } from "react-router-dom";

const Feature = () => {
  const { projectId, featureId } = useParams();
  const data = useLoaderData() as any;

  console.log("data", data);

  return (
    <Box>
      <Text>
        This is feature {featureId} from project {projectId}
      </Text>
    </Box>
  );
};

export default Feature;
