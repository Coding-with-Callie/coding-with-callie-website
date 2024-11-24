import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Text,
  Input,
  IconButton,
  useToast,
  useDisclosure,
  Textarea,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  EditIcon,
  CheckIcon,
  ChevronDownIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import CreateTaskAccordion from "../Tasks/CreateTaskAccordion";
import { Project } from "../../Pages/Projects";
import TaskBox from "../Tasks/TaskBox";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import { axiosPrivate } from "../../helpers/axios_instances";

type Props = {
  name: string;
  status: string;
  description: string;
  projectId: number;
  featureId: number;
  userStoryId: number;
  tasks: Task[];
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};

export type Task = {
  name: string;
  status: string;
  id: number;
};

const UserStoryDetailsAccordion = ({
  name,
  status,
  description,
  projectId,
  featureId,
  userStoryId,
  tasks,
  setProject,
}: Props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan920] = useMediaQuery("(min-width: 920px)");

  const [storyStatus, setStoryStatus] = useState(status);
  const [updateStoryName, setUpdateStoryName] = useState(false);
  const [storyName, setStoryName] = useState(name);
  const [updateStoryDescription, setUpdateStoryDescription] = useState(false);
  const [storyDescription, setStoryDescription] = useState(description);
  const [taskList, setTaskList] = useState(tasks);
  const [startDelete, setStartDelete] = useState(false);

  useEffect(() => {
    setStoryStatus(status);
    setTaskList(tasks);
  }, [status, tasks]);

  const onChangeName = (e: any) => {
    setStoryName(e.target.value);
  };

  const onChangeDescription = (e: any) => {
    setStoryDescription(e.target.value);
  };

  const onClickEditName = () => {
    setUpdateStoryName(!updateStoryName);
  };

  const onClickEditDescription = () => {
    setUpdateStoryDescription(!updateStoryDescription);
  };

  const updateStory = (field: "name" | "description", value: string) => {
    if (storyName === "") {
      toast({
        title: "Error",
        description: "Please enter a valid user story name!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setStoryName(name);
      return;
    }

    if (storyName === name && storyDescription === description) {
      setUpdateStoryName(false);
      setUpdateStoryDescription(false);
      return;
    }

    console.log("Updating story", field, value);

    axiosPrivate
      .patch(
        `/project/${projectId}/feature/${featureId}/user-story/${userStoryId}`,
        {
          field,
          value,
        }
      )
      .then((response) => {
        setProject(response.data);
        setUpdateStoryName(false);
        setUpdateStoryDescription(false);

        toast({
          title: "Success",
          description: `Your user story ${field} has been updated!`,
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
              "There was an error updating your user story. Please try again!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  const deleteStory = () => {
    axiosPrivate
      .delete(
        `/project/${projectId}/feature/${featureId}/user-story/${userStoryId}`
      )
      .then((response) => {
        setProject(response.data);

        toast({
          title: "Success",
          description: "Your user story has been deleted!",
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
              "There was an error deleting your user story. Please try again!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <>
      {updateStoryName || startDelete ? (
        <Box
          border="1px solid #45446A"
          borderRadius="md"
          display="flex"
          p={4}
          alignItems="center"
        >
          {updateStoryName ? (
            <>
              <Box flex={1} mr={4}>
                <Input
                  h="32px"
                  value={storyName}
                  onChange={onChangeName}
                  type="text"
                  layerStyle="text"
                />
              </Box>
              <IconButton
                mr={4}
                aria-label="Edit Name"
                icon={<CheckIcon />}
                size="sm"
                colorScheme="green"
                onClick={() => {
                  updateStory("name", storyName);
                }}
              />
            </>
          ) : (
            <>
              <Text flex={1} textAlign="left" layerStyle="text">
                {name}
              </Text>
              <IconButton
                mr={4}
                aria-label="Edit Name"
                icon={<EditIcon />}
                size="sm"
                colorScheme="green"
                onClick={onClickEditName}
              />
            </>
          )}
          <Text mr={4} layerStyle="text">
            {storyStatus}
          </Text>
          <IconButton
            icon={<DeleteIcon />}
            aria-label="Delete User Story"
            mr={4}
            size="sm"
            colorScheme="green"
            onClick={onOpen}
          />
          <ChevronDownIcon boxSize={5} />
        </Box>
      ) : (
        <Accordion allowToggle>
          <AccordionItem border="none">
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton
                    display="flex"
                    justifyContent="space-between"
                    p={4}
                    border="1px solid #45446A"
                    borderTopRadius="md"
                    _hover={isExpanded ? {} : { transform: "scale(1.005)" }}
                    _active={isExpanded ? {} : { transform: "scale(1)" }}
                    borderBottomRadius={isExpanded ? "none" : "md"}
                    flexDirection={isLargerThan920 ? "row" : "column-reverse"}
                    gap={4}
                  >
                    <Text flex={1} textAlign="left" layerStyle="text">
                      {name}
                    </Text>
                    <Box display="flex" alignItems="center" gap={4}>
                      <Text layerStyle="text">{storyStatus}</Text>
                      <IconButton
                        aria-label="Edit Name"
                        icon={<EditIcon />}
                        size="sm"
                        colorScheme="green"
                        onClick={onClickEditName}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        aria-label="Delete User Story"
                        size="sm"
                        colorScheme="green"
                        onClick={() => {
                          setStartDelete(true);
                          onOpen();
                        }}
                      />
                      <AccordionIcon />
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  p={0}
                  borderLeft="1px solid #45446A"
                  borderRight="1px solid #45446A"
                  borderBottom="1px solid #45446A"
                  borderBottomRadius="md"
                >
                  <Box
                    display="flex"
                    px={4}
                    py={10}
                    borderBottom="1px solid #45446A"
                  >
                    {updateStoryDescription ? (
                      <Box flex={1} mr={4}>
                        <Textarea
                          value={storyDescription}
                          onChange={onChangeDescription}
                          layerStyle="text"
                        />
                      </Box>
                    ) : (
                      <Text layerStyle="text" mr={4} lineHeight="32px">
                        {description || "There is no user story description..."}
                      </Text>
                    )}
                    <IconButton
                      mr={4}
                      aria-label="Edit Name"
                      icon={
                        updateStoryDescription ? <CheckIcon /> : <EditIcon />
                      }
                      size="sm"
                      colorScheme="green"
                      onClick={
                        updateStoryDescription
                          ? () => {
                              updateStory("description", storyDescription);
                            }
                          : onClickEditDescription
                      }
                    />
                  </Box>
                  <Box m={5} display="flex" flexDirection="column" gap={4}>
                    {taskList.map((task) => {
                      return (
                        <TaskBox
                          task={task}
                          setStoryStatus={setStoryStatus}
                          setTaskList={setTaskList}
                          projectId={projectId}
                          featureId={featureId}
                          userStoryId={userStoryId}
                        />
                      );
                    })}
                    <CreateTaskAccordion
                      featureId={featureId}
                      projectId={projectId}
                      userStoryId={userStoryId}
                      setProject={setProject}
                    />
                  </Box>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      )}
      <DeleteModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setStartDelete(false);
        }}
        itemType={"user story"}
        deleteItem={deleteStory}
      />
    </>
  );
};

export default UserStoryDetailsAccordion;
