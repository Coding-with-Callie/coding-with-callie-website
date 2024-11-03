import { Box, Center, Divider } from "@chakra-ui/react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import GuestSpeaker from "../Components/GuestSpeakers/GuestSpeaker";
import GuestSpeakerForm from "../Components/GuestSpeakers/GuestSpeakerForm";
import UpcomingCarousel from "../Components/GuestSpeakers/UpcomingCarousel";
import BodyHeading from "../Components/BodyHeading";
import { useState } from "react";
import { Context } from "../App";

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
    <Box>
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
          return (
            <GuestSpeaker
              speaker={speaker}
              key={index}
              role={role}
              setPastSpeakers={setPastSpeakers}
              setUpcomingSpeakers={setUpcomingSpeakers}
            />
          );
        })}
      </Box>
      {role === "admin" && (
        <Box my={20}>
          <GuestSpeakerForm
            setPastSpeakers={setPastSpeakers}
            setUpcomingSpeakers={setUpcomingSpeakers}
          />
        </Box>
      )}
    </Box>
  );
};

export default GuestSpeakers;
