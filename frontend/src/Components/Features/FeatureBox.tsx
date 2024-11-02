import { Box, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { Feature } from "../../Pages/Project";
import FeatureModal from "./FeatureModal";
import { Project } from "../../Pages/Projects";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../helpers/axios_instances";

type Props = {
  feature: Feature;
  projectId: number;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};

const FeatureBox = ({ feature, projectId, setProject }: Props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCloseModal = () => {
    axiosPrivate
      .get(`/project/${projectId}`)
      .then((response) => {
        setProject(response.data);
        onClose();
      })
      .catch((error) => {
        if (error.response.data.message === "Unauthorized") {
          toast({
            title: "Error",
            description: "Your session has expired, please log in again!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          navigate("/log-in");
        } else {
          toast({
            title: "Error",
            description:
              "There was an error updating your project. Please reload the page!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <>
      <Box
        p={4}
        mx={4}
        mt={4}
        display="flex"
        justifyContent="space-between"
        onClick={onOpen}
        key={feature.id}
        layerStyle="boxButton"
      >
        <Text layerStyle="text">{feature.name}</Text>
        <Text layerStyle="text">
          {feature.completedUserStories}/{feature.userStoryCount}
        </Text>
      </Box>
      <FeatureModal
        isOpen={isOpen}
        onClose={onCloseModal}
        featureName={feature.name}
        featureDescription={feature.description}
        featureId={feature.id}
        projectId={projectId}
        stories={feature.userStories}
        setProject={setProject}
      />
    </>
  );
};

export default FeatureBox;
