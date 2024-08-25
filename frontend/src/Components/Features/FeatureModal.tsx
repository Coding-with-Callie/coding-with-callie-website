import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Box,
  Text,
  Input,
  IconButton,
  useToast,
  Button,
  useDisclosure,
  Heading,
  Textarea,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";
import UserStoryDetailsAccordion, {
  Task,
} from "../UserStories/UserStoryDetailsAccordion";
import CreateUserStoryAccordion from "../UserStories/CreateUserStoryAccordion";
import { Project } from "../../Pages/Projects";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  featureDescription: string | undefined;
  featureId: number;
  projectId: number;
  stories: UserStory[];
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};

export type UserStory = {
  name: string;
  description: string;
  id: number;
  tasks: Task[];
  completedTasks: number;
  taskCount: number;
};

const FeatureModal = ({
  isOpen,
  onClose,
  featureName,
  featureDescription,
  featureId,
  projectId,
  stories,
  setProject,
}: Props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const [updateFeatureName, setUpdateFeatureName] = useState(false);
  const [name, setName] = useState(featureName);

  const [updateFeatureDescription, setUpdateFeatureDescription] =
    useState(false);
  const [description, setDescription] = useState(featureDescription);

  const editName = () => {
    setUpdateFeatureName(!updateFeatureName);
  };

  const onChangeName = (e: any) => {
    setName(e.target.value);
  };

  const editDescription = () => {
    setUpdateFeatureDescription(!updateFeatureDescription);
  };

  const onChangeDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const updateFeature = (
    field: "name" | "description",
    value: string | undefined
  ) => {
    if (name === "") {
      toast({
        title: "Error",
        description: "Please enter a valid feature name!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setName(featureName);
      return;
    }

    if (name === featureName && description === featureDescription) {
      setUpdateFeatureName(false);
      setUpdateFeatureDescription(false);
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .post(
        `https://${window.location.host}/api/auth/update-feature`,
        {
          field,
          value,
          featureId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setProject(response.data);
        setUpdateFeatureName(false);
        setUpdateFeatureDescription(false);

        toast({
          title: "Success",
          description: `Your feature ${field} has been updated!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
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
              "There was an error updating your feature. Please try again!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  const deleteFeature = () => {
    const token = localStorage.getItem("token");

    axios
      .post(
        `https://${window.location.host}/api/auth/delete-feature`,
        {
          featureId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setProject(response.data);
        onCloseDelete();
        onClose();

        toast({
          title: "Success",
          description: "Your feature has been deleted!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
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
              "There was an error deleting your feature. Please try again!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent minW="75%" minH="75%" justifyContent="space-between">
        <Box m={10}>
          <Box mb={20}>
            <Box display="flex" mb={4}>
              {updateFeatureName ? (
                <Box flex={1} mr={4}>
                  <Input
                    h="32px"
                    value={name}
                    onChange={onChangeName}
                    type="text"
                    layerStyle="text"
                  />
                </Box>
              ) : (
                <Heading
                  fontSize={28}
                  mr={4}
                  layerStyle="heading"
                  lineHeight="32px"
                >
                  {featureName}
                </Heading>
              )}
              <IconButton
                mr={4}
                aria-label="Edit Name"
                icon={updateFeatureName ? <CheckIcon /> : <EditIcon />}
                size="sm"
                colorScheme="green"
                onClick={
                  updateFeatureName
                    ? () => {
                        updateFeature("name", name);
                      }
                    : editName
                }
              />
            </Box>
            <Box display="flex">
              {updateFeatureDescription ? (
                <Box flex={1} mr={4}>
                  <Textarea
                    value={description}
                    onChange={onChangeDescription}
                    layerStyle="text"
                  />
                </Box>
              ) : (
                <Text layerStyle="text" mr={4} lineHeight="32px">
                  {featureDescription || "There is no feature description..."}
                </Text>
              )}{" "}
              <IconButton
                mr={4}
                aria-label="Edit Description"
                icon={updateFeatureDescription ? <CheckIcon /> : <EditIcon />}
                size="sm"
                colorScheme="green"
                onClick={
                  updateFeatureDescription
                    ? () => {
                        updateFeature("description", description);
                      }
                    : editDescription
                }
              />
            </Box>
          </Box>
          <ModalCloseButton />
          <Box display="flex" flexDirection="column" gap={4}>
            {stories.map((story) => {
              return (
                <UserStoryDetailsAccordion
                  name={story.name}
                  status={`${story.completedTasks}/${story.taskCount}`}
                  description={story.description}
                  featureId={featureId}
                  projectId={projectId}
                  userStoryId={story.id}
                  tasks={story.tasks}
                  key={story.id}
                  setProject={setProject}
                />
              );
            })}
            <CreateUserStoryAccordion
              featureId={featureId}
              projectId={projectId}
              setProject={setProject}
            />
          </Box>
        </Box>
        <Button m={10} onClick={onOpenDelete} colorScheme="green">
          Delete Feature
        </Button>
      </ModalContent>
      <DeleteModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        itemType={"feature"}
        deleteItem={deleteFeature}
      />
    </Modal>
  );
};

export default FeatureModal;
