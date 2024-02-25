import { Box } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import GuestSpeaker from "../Components/GuestSpeakers/GuestSpeaker";

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
  let speakers = useLoaderData() as Speaker[];

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
    <Box m={"0 auto"}>
      {speakers.map((speaker) => {
        return <GuestSpeaker speaker={speaker} />;
      })}
    </Box>
  );
};

export default GuestSpeakers;
