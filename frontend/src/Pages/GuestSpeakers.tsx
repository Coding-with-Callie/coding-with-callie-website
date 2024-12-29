import { Box } from "@chakra-ui/react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import GuestSpeakerForm from "../Components/GuestSpeakers/GuestSpeakerForm";
import UpcomingCarousel from "../Components/GuestSpeakers/UpcomingCarousel";
import { useState } from "react";
import { Context } from "../App";
import NewSpeaker from "../Components/GuestSpeakers/Speaker";

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

export type GuestSpeakerData = {
  upcomingSpeakers: Speaker[];
  pastSpeakers: Speaker[];
};

const GuestSpeakers = () => {
  const data = useLoaderData() as GuestSpeakerData;
  const context = useOutletContext() as Context;
  const role = context.user.role;

  const [upcomingSpeakers, setUpcomingSpeakers] = useState<Speaker[]>(
    data.upcomingSpeakers
  );
  const [pastSpeakers, setPastSpeakers] = useState<Speaker[]>(
    data.pastSpeakers
  );

  return (
    <>
      <UpcomingCarousel speakers={upcomingSpeakers} />
      {pastSpeakers.map((speaker, index) => {
        return <NewSpeaker key={index} speaker={speaker} />;
      })}
      {role === "admin" && (
        <Box mt={20}>
          <GuestSpeakerForm
            setPastSpeakers={setPastSpeakers}
            setUpcomingSpeakers={setUpcomingSpeakers}
          />
        </Box>
      )}
    </>
  );
};

export default GuestSpeakers;
