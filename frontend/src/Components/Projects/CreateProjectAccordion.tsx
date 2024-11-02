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
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Project } from "../../Pages/Projects";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../helpers/axios_instances";

type Props = {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
};

const CreateProjectAccordion = ({ projects, setProjects }: Props) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitClickedName, setSubmitClickedName] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isErrorName = name === "" && submitClickedName;

  const onChangeName = (e: any) => {
    setSubmitClickedName(false);
    setName(e.target.value);
  };

  const onChangeDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const onSubmit = () => {
    setSubmitClickedName(true);

    if (name !== "") {
      setIsOpen(false);

      axiosPrivate
        .post("/create-project", {
          name,
          description,
        })
        .then((response) => {
          setProjects(response.data);
          setName("");
          setDescription("");
          setSubmitClickedName(false);

          toast({
            title: "Success",
            description: "Your project has been created!",
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
                "There was an error creating your feature. Please try again!",
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
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton
                onClick={() => setIsOpen(!isOpen)}
                h="58px"
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
                <Box
                  layerStyle="text"
                  color="white"
                  as="span"
                  flex="1"
                  textAlign="left"
                  ml={3}
                >
                  Add a project
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} layerStyle="accordionPanel">
              <FormControl isInvalid={isErrorName} isRequired mb={4}>
                <FormLabel layerStyle="text">Project Name:</FormLabel>
                <Input
                  layerStyle="text"
                  type="text"
                  value={name}
                  onChange={onChangeName}
                />
                {!isErrorName ? null : (
                  <FormErrorMessage>Project name is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel layerStyle="text">Project Description:</FormLabel>
                <Textarea
                  layerStyle="text"
                  value={description}
                  onChange={onChangeDescription}
                />
              </FormControl>
              <Button w="100%" onClick={onSubmit} colorScheme="green">
                Create Project
              </Button>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default CreateProjectAccordion;
