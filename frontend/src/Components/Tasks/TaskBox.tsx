import {
  Box,
  Button,
  IconButton,
  Input,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { Task } from "../UserStories/UserStoryDetailsAccordion";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
  task: Task;
  setStoryStatus: React.Dispatch<React.SetStateAction<string>>;
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
};

const TaskBox = ({ task, setStoryStatus, setTaskList }: Props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLargerThan920] = useMediaQuery("(min-width: 920px)");

  const [taskStatus, setTaskStatus] = useState(task.status);
  const [taskName, setTaskName] = useState(task.name);
  const [updateName, setUpdateName] = useState(false);

  const onChange = (e: any) => {
    setTaskName(e.target.value);
  };

  const onClickEdit = () => {
    setUpdateName(!updateName);
  };

  const updateTask = (field: "status" | "name", value: string) => {
    if (taskName === "") {
      toast({
        title: "Error",
        description: "Please enter a valid task name!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setTaskName(task.name);
      return;
    }

    if (taskName === task.name && field === "name") {
      setUpdateName(false);
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .post(
        `https://${window.location.host}/api/auth/update-task`,
        {
          field,
          value,
          taskId: task.id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setStoryStatus(response.data);
        setUpdateName(false);

        toast({
          title: "Success",
          description: `Your task ${field} has been updated!`,
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
              "There was an error updating your task. Please try again!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  const toggleTaskStatus = () => {
    if (taskStatus === "To Do") {
      setTaskStatus("In Progress");
      updateTask("status", "In Progress");
    } else if (taskStatus === "In Progress") {
      setTaskStatus("Done!");
      updateTask("status", "Done!");
    } else {
      setTaskStatus("To Do");
      updateTask("status", "To Do");
    }
  };

  const deleteTask = () => {
    const token = localStorage.getItem("token");

    axios
      .post(
        `https://${window.location.host}/api/auth/delete-task`,
        {
          taskId: task.id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setStoryStatus(response.data.storyStatus);
        setTaskList(response.data.taskList);

        toast({
          title: "Success",
          description: "Your task has been deleted!",
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
              "There was an error deleting your task. Please try again!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <Box
      display="flex"
      border="1px solid #45446A"
      borderRadius="md"
      backgroundColor="white"
      boxShadow="md"
      p={4}
      key={task.name}
      flexDirection={isLargerThan920 ? "row" : "column"}
      gap={4}
    >
      <Box flex={1} order={isLargerThan920 ? 1 : 2}>
        {updateName ? (
          <Input
            layerStyle="text"
            h="32px"
            value={taskName}
            onChange={onChange}
            type="text"
          />
        ) : (
          <Text layerStyle="text" lineHeight="32px">
            {taskName}
          </Text>
        )}
      </Box>
      <Box
        display="flex"
        gap={4}
        justifyContent="center"
        order={isLargerThan920 ? 2 : 1}
      >
        <IconButton
          aria-label="Edit Name"
          icon={updateName ? <CheckIcon /> : <EditIcon />}
          size="sm"
          colorScheme="green"
          onClick={
            updateName
              ? () => {
                  updateTask("name", taskName);
                }
              : onClickEdit
          }
        />
        <Button
          w="118px"
          onClick={toggleTaskStatus}
          colorScheme="green"
          size="sm"
        >
          {taskStatus}
        </Button>
        <IconButton
          aria-label="Delete Task"
          icon={<DeleteIcon />}
          onClick={deleteTask}
          colorScheme="green"
          size="sm"
        />
      </Box>
    </Box>
  );
};

export default TaskBox;
