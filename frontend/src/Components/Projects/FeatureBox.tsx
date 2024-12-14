import { Box } from "@chakra-ui/react";
import MyButton from "../MyButton";
import { useNavigate } from "react-router-dom";

type Props = {
  name: string;
  projectId: number;
  featureId: number;
};

const FeatureBox = ({ name, projectId, featureId }: Props) => {
  const navigate = useNavigate();

  const goToFeature = () => {
    navigate(`/project/${projectId}/feature/${featureId}`);
  };

  return (
    <Box mb={2}>
      <MyButton onClick={goToFeature}>{name}</MyButton>
    </Box>
  );
};

export default FeatureBox;
