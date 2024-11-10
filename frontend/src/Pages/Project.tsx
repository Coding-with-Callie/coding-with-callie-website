import {
  Box,
  Button,
  Heading,
  IconButton,
  Input,
  Text,
  Textarea,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Project as ProjectType } from "./Projects";
import { useState } from "react";
import { UserStory } from "../Components/Features/FeatureModal";
import DeleteModal from "../Components/DeleteModal";
import StatusColumn, { Column } from "../Components/Project/StatusColumn";
import { axiosPrivate } from "../helpers/axios_instances";

export type Feature = {
  name: string;
  status: "To Do" | "In Progress" | "Done!";
  userStoryCount: number;
  completedUserStories: number;
  description?: string;
  id: number;
  userStories: UserStory[];
};

const columns = [
  {
    name: "To Do",
  },
  {
    name: "In Progress",
  },
  {
    name: "Done!",
  },
];

const Project = () => {
  const loaderData = useLoaderData() as ProjectType;
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");

  const [project, setProject] = useState(loaderData);
  const [projectName, setProjectName] = useState(project.name);
  const [projectDescription, setProjectDescription] = useState(
    project.description
  );
  const [updateProjectName, setUpdateProjectName] = useState(false);
  const [updateProjectDescription, setUpdateProjectDescription] =
    useState(false);

  const editName = () => {
    setUpdateProjectName(!updateProjectName);
  };

  const onChangeName = (e: any) => {
    setProjectName(e.target.value);
  };

  const editDescription = () => {
    setUpdateProjectDescription(!updateProjectDescription);
  };

  const onChangeDescription = (e: any) => {
    setProjectDescription(e.target.value);
  };

  const updateProject = (
    field: "name" | "description",
    value: string | undefined
  ) => {
    if (projectName === "") {
      toast({
        title: "Error",
        description: "Please enter a valid project name!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setProjectName(project.name);
      return;
    }

    if (
      projectName === project.name &&
      projectDescription === project.description
    ) {
      setUpdateProjectName(false);
      setUpdateProjectDescription(false);
      return;
    }

    axiosPrivate
      .patch(`/project/${project.id}`, {
        field,
        value,
      })
      .then((response) => {
        setProject(response.data);
        setUpdateProjectName(false);
        setUpdateProjectDescription(false);

        toast({
          title: "Success",
          description: `Your project ${field} has been updated!`,
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
              "There was an error updating your project. Please try again!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  const deleteProject = () => {
    axiosPrivate
      .delete(`/project/${project.id}`)
      .then(() => {
        onClose();
        navigate("/project");
        toast({
          title: "Success",
          description: "Your project has been deleted!",
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
              "There was an error deleting your project. Please try again!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <Box mx={isLargerThan500 ? 10 : 4} mt={20}>
      <Box mb={20} display="flex" justifyContent="space-between">
        <Box flex={1}>
          <Box display="flex" mb={4}>
            {updateProjectName ? (
              <Box flex={1} mr={4}>
                <Input
                  h="32px"
                  value={projectName}
                  onChange={onChangeName}
                  type="text"
                  variant="filled"
                />
              </Box>
            ) : (
              <Heading
                fontSize={28}
                mr={4}
                layerStyle="heading"
                lineHeight="32px"
              >
                {project.name}
              </Heading>
            )}
            <IconButton
              mr={4}
              aria-label="Edit Name"
              icon={updateProjectName ? <CheckIcon /> : <EditIcon />}
              size="sm"
              colorScheme="green"
              onClick={
                updateProjectName
                  ? () => {
                      updateProject("name", projectName);
                    }
                  : editName
              }
            />
          </Box>
          <Box display="flex">
            {updateProjectDescription ? (
              <Box flex={1} mr={4}>
                <Textarea
                  layerStyle="text"
                  value={projectDescription}
                  onChange={onChangeDescription}
                  variant="filled"
                />
              </Box>
            ) : (
              <Text layerStyle="text" mr={4} lineHeight="32px">
                {project.description || "There is no product description..."}
              </Text>
            )}
            <IconButton
              mr={4}
              aria-label="Edit Description"
              icon={updateProjectDescription ? <CheckIcon /> : <EditIcon />}
              size="sm"
              colorScheme="green"
              onClick={
                updateProjectDescription
                  ? () => {
                      updateProject("description", projectDescription);
                    }
                  : editDescription
              }
            />
          </Box>
        </Box>
      </Box>
      <Box display="flex" gap={10} flexWrap="wrap" mb={10}>
        {columns.map((column: Column) => {
          return (
            <StatusColumn
              column={column}
              project={project}
              setProject={setProject}
            />
          );
        })}
      </Box>
      <Button onClick={onOpen} colorScheme="green" w="100%" mb={10}>
        Delete Project
      </Button>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        itemType={"project"}
        deleteItem={deleteProject}
      />
    </Box>
  );
};

export default Project;
