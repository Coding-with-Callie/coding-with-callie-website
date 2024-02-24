import { Link, useOutletContext } from "react-router-dom";
import { Context } from "../../App";
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
import { showNotification } from "../..";
import BodyHeading from "../BodyHeading";
import BodyText from "../BodyText";
import MyButton from "../MyButton";
import Paragraph from "../Paragraph";
import VideoModal from "./VideoModal";

type Props = {
  speaker: Speaker;
};

const GuestSpeaker = ({ speaker }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const context: Context = useOutletContext();
  const loggedIn =
    context.user === null ? false : context.user.username !== undefined;

  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  const showToast = () => {
    showNotification("Sign-up to receive the Zoom link!", "info");
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
        <Box display="flex" gap={4} w="100%" justifyContent="center">
          <Link to={speaker.websiteUrl} target="_blank">
            <MyButton>{`Contact ${speaker.name.split(" ")[0]}`}</MyButton>
          </Link>
          {loggedIn ? (
            speaker.sessionRecordingUrl ? (
              <MyButton onClick={onOpen}>Watch Recording</MyButton>
            ) : null
          ) : (
            <Link to="/sign-up">
              <MyButton onClick={showToast}>Get Zoom Link</MyButton>
            </Link>
          )}
        </Box>
      </Box>
      <VideoModal isOpen={isOpen} onClose={onClose} speaker={speaker} />
    </Section>
  );
};

export default GuestSpeaker;
