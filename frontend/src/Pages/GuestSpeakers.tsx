import { Box, Center, Divider } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import GuestSpeaker from "../Components/GuestSpeakers/GuestSpeaker";
import GuestSpeakerForm from "../Components/GuestSpeakers/GuestSpeakerForm";
import UpcomingCarousel from "../Components/GuestSpeakers/UpcomingCarousel";
import BodyHeading from "../Components/BodyHeading";
import { useEffect, useState } from "react";
import axios from "axios";
import { host } from "..";

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

  const [role, setRole] = useState<string | null>(null);
  const [upcomingSpeakers, setUpcomingSpeakers] = useState<Speaker[]>(
    data.upcomingSpeakers
  );
  const [pastSpeakers, setPastSpeakers] = useState<Speaker[]>(
    data.pastSpeakers
  );

  useEffect(() => {
    const profileLoader = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(`${host}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return response.data.role;
        } catch (error) {
          console.error("Failed to fetch profile:", error);
          return null;
        }
      } else {
        return null;
      }
    };

    const loadProfile = async () => {
      const userRole = await profileLoader();
      setRole(userRole);
    };

    loadProfile();
  }, []);

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
