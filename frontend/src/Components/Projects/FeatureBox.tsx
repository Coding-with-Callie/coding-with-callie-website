import { Box } from "@chakra-ui/react";
import MyButton from "../MyButton";
import { useNavigate } from "react-router-dom";

type Props = {
  name: string;
  id: number;
};

const FeatureBox = ({ name, id }: Props) => {
  const navigate = useNavigate();

  const goToFeature = () => {
    navigate(`/feature/${id}`);
  };

  return (
    <Box mb={2}>
      <MyButton onClick={goToFeature}>{name}</MyButton>
    </Box>
  );
};

export default FeatureBox;
