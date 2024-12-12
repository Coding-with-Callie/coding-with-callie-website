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
import { Feature } from "../../Pages/Project";
import { useNavigate } from "react-router-dom";
import { Project } from "../../Pages/Projects";
import { axiosPrivate } from "../../helpers/axios_instances";

type Props = {
  features: Feature[];
  setProject: React.Dispatch<React.SetStateAction<Project>>;
  projectId: number;
};

const CreateFeatureAccordion = ({ features, setProject, projectId }: Props) => {
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
        .post(`/project/${projectId}/feature`, {
          name,
          description,
        })
        .then((response) => {
          setProject(response.data);
          setName("");
          setDescription("");
          setSubmitClickedName(false);

          toast({
            title: "Success",
            description: "Your feature has been created!",
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
      <AccordionItem border="none">
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton
                onClick={() => setIsOpen(!isOpen)}
                h="58px"
                layerStyle="accordionButton"
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
              >
                {isExpanded ? (
                  <MinusIcon fontSize="12px" color="white" />
                ) : (
                  <AddIcon fontSize="12px" color="white" />
                )}
                <Box color="white" as="span" flex="1" textAlign="left" ml={3}>
                  Add a feature
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
                <FormLabel>Feature Name:</FormLabel>
                <Input type="text" value={name} onChange={onChangeName} />
                {!isErrorName ? null : (
                  <FormErrorMessage>Feature name is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Feature Description:</FormLabel>
                <Textarea value={description} onChange={onChangeDescription} />
              </FormControl>
              <Button w="100%" onClick={onSubmit}>
                Create Feature
              </Button>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default CreateFeatureAccordion;
