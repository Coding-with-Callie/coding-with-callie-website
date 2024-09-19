import { Box, Center } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import GuestSpeaker from "../Components/GuestSpeakers/GuestSpeaker";
import GuestSpeakerForm from "../Components/GuestSpeakers/GuestSpeakerForm";

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
  const data = useLoaderData() as { basicData: Speaker[] };
  let speakers = data.basicData;

  speakers = speakers.sort((a, b) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    if (aDate < bDate) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <Box>
      <Center><GuestSpeakerForm /></Center>
      <Box m={"0 auto"}>
        {speakers.map((speaker, index) => {
          return <GuestSpeaker speaker={speaker} key={index} />;
        })}
      </Box>
    </Box>
  );
};

export default GuestSpeakers;
