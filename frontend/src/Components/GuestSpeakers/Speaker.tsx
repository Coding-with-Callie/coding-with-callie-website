import { AspectRatio, Box, Image, useMediaQuery } from "@chakra-ui/react";
import { Speaker } from "../../Pages/GuestSpeakers";
import BodyHeading from "../BodyHeading";
import Section from "../Section";
import ReactPlayer from "react-player";

type Props = {
  speaker: Speaker;
};

const NewSpeaker = ({ speaker }: Props) => {
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");
  const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");

  return (
    <Section>
      <Box
        display="flex"
        gap={6}
        flexDirection={isLargerThan1300 ? "row" : "column"}
        alignItems="center"
      >
        <Box mx="auto">
          <AspectRatio
            h={isLargerThan500 ? "350px" : "250px"}
            w={isLargerThan500 ? "350px" : "250px"}
            ratio={1}
            mb={6}
          >
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
        <ReactPlayer url={speaker.sessionRecordingUrl} controls width="100%" />
      </Box>
    </Section>
  );
};

export default NewSpeaker;
