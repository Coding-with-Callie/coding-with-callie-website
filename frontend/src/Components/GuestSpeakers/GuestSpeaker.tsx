import { Link } from "react-router-dom";
import { Speaker } from "../../Pages/GuestSpeakers";
import Section from "../Section";
import {
  useMediaQuery,
  Image,
  Box,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  useDisclosure,
  Input,
  IconButton,
  Textarea,
  AspectRatio,
} from "@chakra-ui/react";
import BodyHeading from "../BodyHeading";
import BodyText from "../BodyText";
import MyButton from "../MyButton";
import Paragraph from "../Paragraph";
import VideoModal from "./VideoModal";
import ZoomModal from "./ZoomModal";
import Alert from "../Profile/Alert";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { axiosPrivate } from "../../helpers/axios_instances";
import { FaRegCheckCircle, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { validURL } from "../../helpers/helpers";

type Props = {
  speaker: Speaker;
  editable: boolean;
  setPastSpeakers: React.Dispatch<React.SetStateAction<Speaker[]>>;
  setUpcomingSpeakers: React.Dispatch<React.SetStateAction<Speaker[]>>;
};

const GuestSpeaker = ({
  speaker,
  editable,
  setPastSpeakers,
  setUpcomingSpeakers,
}: Props) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(speaker.name);
  const [date, setDate] = useState(speaker.date);
  const [sessionText, setSessionText] = useState(
    speaker.sessionText.join("\n\n")
  );
  const [bioText, setBioText] = useState(speaker.bioText.join("\n\n"));
  const [image, setImage] = useState<File | undefined>(undefined);
  const [websiteUrl, setWebsiteUrl] = useState(speaker.websiteUrl);
  const [sessionRecordingUrl, setSessionRecordingUrl] = useState(
    speaker.sessionRecordingUrl
  );
  const [fileInputKey, setFileInputKey] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenZoom,
    onOpen: onOpenZoom,
    onClose: onCloseZoom,
  } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");

  const deleteGuestSpeaker = async () => {
    await axiosPrivate
      .delete(`/speaker/${speaker.id}`)
      .then((response) => {
        setPastSpeakers(response.data.pastSpeakers);
        setUpcomingSpeakers(response.data.upcomingSpeakers);
        onCloseAlert();
        toast.success("Guest speaker deleted successfully");
      })
      .catch(() => {
        toast.error("Error deleting guest speaker");
      });
  };

  const editGuestSpeaker = () => {
    setEdit(true);
  };

  const onChangeName = (e: any) => {
    setName(e.target.value);
  };

  const onChangeDate = (e: any) => {
    setDate(e.target.value);
  };

  const onChangeSessionText = (e: any) => {
    setSessionText(e.target.value);
  };

  const onChangeBioText = (e: any) => {
    setBioText(e.target.value);
  };

  const onChangeImage = (e: React.ChangeEvent<any>) => {
    setImage(e.target.files[0]);
  };

  const onChangeWebsiteUrl = (e: any) => {
    setWebsiteUrl(e.target.value);
  };

  const onChangeSessionRecordingUrl = (e: any) => {
    setSessionRecordingUrl(e.target.value);
  };

  const submitEdit = () => {
    if (
      name === "" ||
      date === "" ||
      sessionText === "" ||
      bioText === "" ||
      websiteUrl === "" ||
      !validURL(websiteUrl) ||
      (sessionRecordingUrl !== "" && !validURL(sessionRecordingUrl))
    ) {
      toast.error("Please fill out all fields correctly");
      return;
    }

    if (
      name === speaker.name &&
      date === speaker.date &&
      sessionText === speaker.sessionText.join("\n\n") &&
      bioText === speaker.bioText.join("\n\n") &&
      websiteUrl === speaker.websiteUrl &&
      sessionRecordingUrl === speaker.sessionRecordingUrl &&
      !image
    ) {
      setEdit(false);
      return;
    }

    const [year, month, day] = date.split("-").map(Number);
    const dateValue = new Date(year, month - 1, day);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const editedDate = dateValue.toLocaleDateString("en-US", options);

    const formData = new FormData();
    if (image) {
      formData.append("file", image);
    }
    formData.append("name", name);
    formData.append("date", editedDate);
    formData.append("sessionText", sessionText);
    formData.append("bioText", bioText);
    formData.append("websiteUrl", websiteUrl);
    formData.append("sessionRecordingUrl", sessionRecordingUrl);

    axiosPrivate
      .put(`/speaker/${speaker.id}`, formData)
      .then((response) => {
        setPastSpeakers(response.data.pastSpeakers);
        setUpcomingSpeakers(response.data.upcomingSpeakers);
        setEdit(false);
        toast.success("Guest speaker updated successfully");
        setFileInputKey(new Date().getTime().toString());
      })
      .catch(() => {
        toast.error("Error updating guest speaker");
      });
  };

  return (
    <Section
      screenSizeParameter={isLargerThan900}
      alignItemsCenter={false}
      gapSize={10}
      direction={isLargerThan900 ? "row" : "column"}
    >
      <AspectRatio h={"250px"} w={"250px"} ratio={1}>
        {edit ? (
          <Input
            p={0}
            border="none"
            borderRadius="0px"
            type="file"
            accept="image/*"
            onChange={onChangeImage}
            key={fileInputKey}
            backgroundColor="white"
          />
        ) : (
          <Image
            src={speaker.photoUrl}
            borderRadius="50%"
            h={"250px"}
            boxShadow="lg"
          />
        )}
      </AspectRatio>
      <Box
        w={isLargerThan900 ? "60%" : "100%"}
        display="flex"
        flexDirection="column"
        gap={6}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {edit ? (
            <Input
              type="text"
              layerStyle="inputResource"
              variant="filled"
              id="name"
              value={name}
              mr={2}
              onChange={onChangeName}
              isInvalid={name === ""}
              _hover={{ backgroundColor: "gray.50" }}
              _focus={{ backgroundColor: "white" }}
            />
          ) : (
            <BodyHeading textAlignCenter={false} removeMargin>
              {speaker.name}
            </BodyHeading>
          )}
          {editable && (
            <Box display="flex" gap={2}>
              <IconButton
                aria-label={"edit guest speaker"}
                icon={edit ? <FaRegCheckCircle /> : <FaRegEdit />}
                onClick={edit ? submitEdit : editGuestSpeaker}
                colorScheme="green"
              />
              <IconButton
                aria-label={"delete guest speaker"}
                icon={<FaRegTrashAlt />}
                onClick={onOpenAlert}
                colorScheme="red"
              />
            </Box>
          )}
        </Box>
        <Accordion
          defaultIndex={[0]}
          index={edit ? [0, 1, 2] : undefined}
          allowToggle
          borderColor="black"
          allowMultiple={true}
        >
          <AccordionItem borderColor={"#45446A"}>
            <h2>
              <AccordionButton>
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  color={"#45446A"}
                  fontWeight="900"
                >
                  Meet-up Date
                </Box>
                <AccordionIcon color={"#45446A"} />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {edit ? (
                <Input
                  type="date"
                  layerStyle="inputResource"
                  variant="filled"
                  value={date}
                  onChange={onChangeDate}
                  isInvalid={date === ""}
                  _hover={{ backgroundColor: "gray.50" }}
                  _focus={{ backgroundColor: "white" }}
                />
              ) : (
                <Paragraph>{`${speaker.date} ${speaker.time}`}</Paragraph>
              )}
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem borderColor={"#45446A"}>
            <h2>
              <AccordionButton>
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  color={"#45446A"}
                  fontWeight="900"
                >
                  Session Description
                </Box>
                <AccordionIcon color={"#45446A"} />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {edit ? (
                <Textarea
                  layerStyle="inputResource"
                  variant="filled"
                  value={sessionText}
                  onChange={onChangeSessionText}
                  isInvalid={sessionText === ""}
                  _hover={{ backgroundColor: "gray.50" }}
                  _focus={{ backgroundColor: "white" }}
                />
              ) : (
                <BodyText
                  textBlocks={speaker.sessionText}
                  textAlignCenter={false}
                />
              )}
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem borderColor={"#45446A"}>
            <h2>
              <AccordionButton>
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  color={"#45446A"}
                  fontWeight="900"
                >
                  About {speaker.name.split(" ")[0]}
                </Box>
                <AccordionIcon color={"#45446A"} />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {edit ? (
                <Textarea
                  layerStyle="inputResource"
                  variant="filled"
                  value={bioText}
                  onChange={onChangeBioText}
                  isInvalid={bioText === ""}
                  _hover={{ backgroundColor: "gray.50" }}
                  _focus={{ backgroundColor: "white" }}
                />
              ) : (
                <BodyText
                  textBlocks={speaker.bioText}
                  textAlignCenter={false}
                />
              )}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Box
          display="flex"
          gap={4}
          w="100%"
          justifyContent="center"
          flexDirection={isLargerThan500 ? "row" : "column"}
        >
          {edit ? (
            <Input
              type="text"
              layerStyle="inputResource"
              variant="filled"
              value={websiteUrl}
              onChange={onChangeWebsiteUrl}
              isInvalid={websiteUrl === "" && !validURL(websiteUrl)}
              _hover={{ backgroundColor: "gray.50" }}
              _focus={{ backgroundColor: "white" }}
            />
          ) : (
            <Link to={speaker.websiteUrl} target="_blank">
              <MyButton widthSize="100%">{`Contact ${
                speaker.name.split(" ")[0]
              }`}</MyButton>
            </Link>
          )}
          {edit ? (
            <Input
              type="text"
              layerStyle="inputResource"
              variant="filled"
              value={sessionRecordingUrl}
              onChange={onChangeSessionRecordingUrl}
              isInvalid={
                sessionRecordingUrl !== ""
                  ? !validURL(sessionRecordingUrl)
                  : false
              }
              _hover={{ backgroundColor: "gray.50" }}
              _focus={{ backgroundColor: "white" }}
            />
          ) : (
            <Box>
              {speaker.sessionRecordingUrl ? (
                <MyButton onClick={onOpen}>Watch Recording</MyButton>
              ) : (
                <MyButton onClick={onOpenZoom}>Zoom Link</MyButton>
              )}
            </Box>
          )}
        </Box>
      </Box>
      <VideoModal isOpen={isOpen} onClose={onClose} speaker={speaker} />
      <ZoomModal isOpen={isOpenZoom} onClose={onCloseZoom} />
      <Alert
        isOpenAlert={isOpenAlert}
        onCloseAlert={onCloseAlert}
        cancelRef={cancelRef}
        item="guest speaker"
        handleDelete={deleteGuestSpeaker}
      />
    </Section>
  );
};

export default GuestSpeaker;
