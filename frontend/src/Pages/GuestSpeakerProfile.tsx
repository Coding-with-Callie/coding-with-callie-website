import { Box, Text, Image } from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import UserDetailsRow from "../Components/GuestSpeakers/DetailsRow";
import { useParams } from "react-router-dom";
import MyButton from "../Components/MyButton";

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

const GuestSpeakerProfile = () => {
  const data = useLoaderData() as { basicData: Speaker[]; loaderData: Profile };

  // This should request the specific speaker from the server (not all speakers)
  let speakers = data.basicData;
  let profile = data.loaderData;

  const { id } = useParams<{ id: string }>();
  const speaker = speakers.find(
    (speaker) => speaker.id === Number(id)
  ) as Speaker;

  const navigate = useNavigate();

  if (profile.role !== "admin") {
    return null;
  }

  if (!speaker) {
    return <Text>Speaker not found</Text>;
  }

  return (
    <Box>
      <Text textAlign="center" mb={4}>
        Account Details
      </Text>
      <Text textAlign="center">
        Welcome, You can manage guest speaker details here.
      </Text>
      <Box display="flex" w="60%" gap={10} margin="0 auto" py={20}>
        <Box display="flex" alignItems="center">
          <Image
            src={speaker.photoUrl}
            borderRadius="50%"
            maxH={{ base: "200px", md: "250px" }}
            objectFit="cover"
            boxShadow="lg"
          />
        </Box>
        <Box w="100%" display="flex" flexDirection="column" gap={3}>
          <UserDetailsRow
            field="Name"
            value={speaker.name}
            variableName="name"
          />
          <UserDetailsRow
            field="Date"
            value={speaker.date}
            variableName="date"
          />
          <UserDetailsRow
            field="Time"
            value={speaker.time}
            variableName={"time"}
          />
          <UserDetailsRow
            field="Session Description"
            value={speaker.sessionText.join("\n\n")}
            variableName={"sessionText"}
          />
          <UserDetailsRow
            field="About"
            value={speaker.bioText.join("\n\n")}
            variableName={"bioText"}
          />
          <UserDetailsRow
            field="Website"
            value={speaker.websiteUrl}
            variableName={"websiteUrl"}
          />
          <UserDetailsRow
            field="Photo"
            value={speaker.photoUrl}
            variableName={"photoUrl"}
          />
          <UserDetailsRow
            field="Session Recording"
            value={speaker.sessionRecordingUrl}
            variableName={"sessionRecordingUrl"}
          />
        </Box>
      </Box>
      <Box display="flex" gap={4} justifyContent="center">
        <MyButton onClick={() => navigate("/guest-speakers")}>Back</MyButton>
      </Box>
    </Box>
  );
};
export default GuestSpeakerProfile;
