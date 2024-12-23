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
} from "@chakra-ui/react";
import BodyHeading from "../BodyHeading";
import BodyText from "../BodyText";
import MyButton from "../MyButton";
import DeleteButton from "../DeleteButton";
import Paragraph from "../Paragraph";
import VideoModal from "./VideoModal";
import ZoomModal from "./ZoomModal";
import { useNavigate } from "react-router-dom";
import Alert from "../Profile/Alert";
import { useRef } from "react";
import axios from "axios";
import { host } from "../..";
import { toast } from "react-toastify";

type Props = {
  speaker: Speaker;
  role: string | null;
  setPastSpeakers: React.Dispatch<React.SetStateAction<Speaker[]>>;
  setUpcomingSpeakers: React.Dispatch<React.SetStateAction<Speaker[]>>;
};

const GuestSpeaker = ({
  speaker,
  role,
  setPastSpeakers,
  setUpcomingSpeakers,
}: Props) => {
  const navigate = useNavigate();

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
    await axios
      .delete(`${host}/api/auth/speaker/${speaker.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
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

  return (
    <Section
      screenSizeParameter={isLargerThan900}
      alignItemsCenter={false}
      gapSize={10}
      direction={isLargerThan900 ? "row" : "column"}
    >
      <Image
        src={speaker.photoUrl}
        borderRadius="50%"
        h={"250px"}
        boxShadow="lg"
      />
      <Box
        w={isLargerThan900 ? "60%" : "100%"}
        display="flex"
        flexDirection="column"
        gap={6}
      >
        <BodyHeading textAlignCenter={false} removeMargin>
          {speaker.name}
        </BodyHeading>
        <Accordion defaultIndex={[0]} allowToggle borderColor="black">
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
              <Paragraph>{`${speaker.date} ${speaker.time}`}</Paragraph>
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
              <BodyText
                textBlocks={speaker.sessionText}
                textAlignCenter={false}
              />
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
              <BodyText textBlocks={speaker.bioText} textAlignCenter={false} />
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
          <Link to={speaker.websiteUrl} target="_blank">
            <MyButton widthSize="100%">{`Contact ${
              speaker.name.split(" ")[0]
            }`}</MyButton>
          </Link>
          {speaker.sessionRecordingUrl ? (
            <MyButton onClick={onOpen}>Watch Recording</MyButton>
          ) : (
            <MyButton onClick={onOpenZoom}>Zoom Link</MyButton>
          )}
          {role === "admin" ? (
            <>
              <MyButton
                onClick={() => {
                  navigate(`/guest-speaker/${speaker.id}`);
                }}
              >
                Edit
              </MyButton>
              <DeleteButton onClick={onOpenAlert}>Delete</DeleteButton>
            </>
          ) : null}
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
