import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../Pages/Projects";
import { axiosPrivate } from "../../helpers/axios_instances";

type Props = {
  featureId: number;
  projectId: number;
  userStoryId: number;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};

const CreateTaskAccordion = ({
  projectId,
  featureId,
  userStoryId,
  setProject,
}: Props) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [submitClickedName, setSubmitClickedName] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isErrorName = name === "" && submitClickedName;

  const onChangeName = (e: any) => {
    setSubmitClickedName(false);
    setName(e.target.value);
  };

  const onSubmit = () => {
    setSubmitClickedName(true);

    if (name !== "") {
      setIsOpen(false);

      axiosPrivate
        .post(
          `/project/${projectId}/feature/${featureId}/user-story/${userStoryId}/task`,
          { name }
        )
        .then((response) => {
          setProject(response.data);
          setName("");
          setSubmitClickedName(false);

          toast({
            title: "Success",
            description: "Your developer task has been created!",
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
                "There was an error creating your developer task. Please try again!",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        });
    }
  };

  return (
    <Accordion allowToggle index={isOpen ? 0 : 1}>
      <AccordionItem border="none">
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton
                onClick={() => setIsOpen(!isOpen)}
                h="66px"
                _hover={
                  isExpanded
                    ? {
                        backgroundColor: "rgb(69, 68, 106, 0.75)",
                      }
                    : {
                        backgroundColor: "rgb(69, 68, 106, 0.75)",
                        transform: "scale(1.005)",
                      }
                }
                _active={isExpanded ? {} : { transform: "scale(1)" }}
                borderBottomRadius={isExpanded ? "none" : "md"}
                layerStyle="accordionButton"
              >
                {isExpanded ? (
                  <MinusIcon fontSize="12px" color="white" />
                ) : (
                  <AddIcon fontSize="12px" color="white" />
                )}
                <Box as="span" flex="1" textAlign="left" ml={3} color="white">
                  Add a task
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel
              pb={4}
              layerStyle="accordionPanel"
              borderLeft="1px solid #45446A"
              borderRight="1px solid #45446A"
              borderBottom="1px solid #45446A"
            >
              <FormControl isInvalid={isErrorName} isRequired mb={4}>
                <FormLabel layerStyle="text">Task Name:</FormLabel>
                <Input
                  layerStyle="text"
                  type="text"
                  value={name}
                  onChange={onChangeName}
                />
                {!isErrorName ? null : (
                  <FormErrorMessage>
                    Developer task name is required.
                  </FormErrorMessage>
                )}
              </FormControl>
              <Button w="100%" onClick={onSubmit} colorScheme="green">
                Create Task
              </Button>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default CreateTaskAccordion;
