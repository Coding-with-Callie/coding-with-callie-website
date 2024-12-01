import { AspectRatio, Box, Image } from "@chakra-ui/react";
import { Speaker } from "../../Pages/GuestSpeakers";
import BodyHeading from "../BodyHeading";
import Section from "../Section";
import ReactPlayer from "react-player";

type Props = {
  speaker: Speaker;
};

const NewSpeaker = ({ speaker }: Props) => {
  return (
    <Section>
      <Box display="flex" gap={6}>
        <Box>
          <AspectRatio h={"350px"} w={"350px"} ratio={1} mb={6}>
            <Image
              src={speaker.photoUrl}
              borderRadius="50%"
              h={"350px"}
              boxShadow="lg"
            />
          </AspectRatio>
          <BodyHeading mb={0} textAlign="center">
            {speaker.name}
          </BodyHeading>
        </Box>
        <Box w={"100%"}>
          <ReactPlayer
            url={speaker.sessionRecordingUrl}
            controls
            width="100%"
            height="100%"
          />
        </Box>
      </Box>
    </Section>
  );
};

export default NewSpeaker;
