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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Project } from "../../Pages/Projects";

type Props = {
  featureId: number;
  projectId: number;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
};

const CreateUserStoryAccordion = ({
  projectId,
  featureId,
  setProject,
}: Props) => {
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

      const token = localStorage.getItem("token");

      axios
        .post(
          `https://${window.location.host}/api/auth/create-user-story`,
          {
            name,
            description,
            projectId,
            featureId,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          setProject(response.data);
          setName("");
          setDescription("");
          setSubmitClickedName(false);

          toast({
            title: "Success",
            description: "Your user story has been created!",
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
                "There was an error creating your user story. Please try again!",
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
                  Add a user story
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
                <FormLabel layerStyle="text">User Story Name:</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={onChangeName}
                  layerStyle="text"
                />
                {!isErrorName ? null : (
                  <FormErrorMessage>
                    User story name is required.
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel layerStyle="text">User Story Description:</FormLabel>
                <Textarea
                  value={description}
                  onChange={onChangeDescription}
                  layerStyle="text"
                />
              </FormControl>
              <Button w="100%" onClick={onSubmit} colorScheme="green">
                Create User Story
              </Button>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default CreateUserStoryAccordion;
