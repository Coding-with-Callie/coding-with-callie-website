import { Box, Center, Divider } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import GuestSpeaker from "../Components/GuestSpeakers/GuestSpeaker";
import GuestSpeakerForm from "../Components/GuestSpeakers/GuestSpeakerForm";
import UpcomingCarousel from "../Components/GuestSpeakers/UpcomingCarousel";
import BodyHeading from "../Components/BodyHeading";

export type Speaker = {
  id: number;
  name: string;
  date: string;
  time: string;
  sessionText: string[];
  bioText: string[];
  websiteUrl: string;
  photoUrl: string;
  sessionRecordingUrl: string;
};

const GuestSpeakers = () => {
  const data = useLoaderData() as Speaker[];
  let speakers = data;
  //Sort speakers in descending order based on date. Times are ignored.
  speakers = speakers.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    if (aDate > bDate) {
      return -1;
    } else {
      return 1;
    }
  });
  //Split speakers into upcomingSpeakers and pastSpeakers based on date
  const { upcomingSpeakers, pastSpeakers } = speakers.reduce(
    (
      acc: { upcomingSpeakers: Speaker[]; pastSpeakers: Speaker[] },
      speaker: Speaker
    ) => {
      /*Speaker.date does not include a timestamp. So this object will be
      created as midgnight on the speaker's date*/
      const date = new Date(speaker.date);
      //Date() creates a date object with a timestamp of when it was created
      const today = new Date();
      /*set the time of today to midnight which will allow us to compare just
      the dates and not times.*/
      today.setHours(0, 0, 0, 0);
      if (date >= today) {
        acc.upcomingSpeakers.push(speaker);
      } else {
        acc.pastSpeakers.push(speaker);
      }
      return acc;
    },
    { upcomingSpeakers: [], pastSpeakers: [] }
  );
  return (
    <Box>
      <Center>
        <GuestSpeakerForm />
      </Center>
      <Box m={"0 auto"}>
        <UpcomingCarousel speakers={upcomingSpeakers} />
        <BodyHeading textAlignCenter={true}>Past Speakers</BodyHeading>
        <Center>
          <Divider
            w="80%"
            orientation="horizontal"
            borderColor="black"
            mb={4}
          />
        </Center>
        {pastSpeakers.map((speaker, index) => {
          return <GuestSpeaker speaker={speaker} key={index} />;
        })}
      </Box>
    </Box>
  );
};

export default GuestSpeakers;
