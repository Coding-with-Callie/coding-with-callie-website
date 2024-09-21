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

export type Profile = {
  role: string;
  };

const GuestSpeakers = () => {
  const data = useLoaderData() as { basicData: Speaker[], loaderData: Profile };
  let speakers = data.basicData;
  let profile = data.loaderData;

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
          return <GuestSpeaker speaker={speaker} profile={profile} key={index} />;
        })}
      </Box>
    </Box>
  );
};

export default GuestSpeakers;
