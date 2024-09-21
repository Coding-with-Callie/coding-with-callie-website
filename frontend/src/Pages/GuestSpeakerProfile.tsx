import { Box, Text, Avatar, Image } from '@chakra-ui/react';
import { useLoaderData, useNavigate } from 'react-router-dom'
import UserDetailsRow from '../Components/GuestSpeakers/DetailsRow';
import { useParams } from 'react-router-dom';

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
  const data = useLoaderData() as { basicData: Speaker[], loaderData: Profile };
  let speakers = data.basicData;
  let profile = data.loaderData;
  const { id } = useParams<{ id: string }>();
  const speaker = speakers.find(speaker => speaker.id === Number(id)) as Speaker;

  const navigate = useNavigate();

  const truncateString = (str: string, num: number) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

    if (profile.role !== 'admin') {
      return null;
    }

    if (!speaker) {
      return <Text>Speaker not found</Text>
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
            <Box display="flex" alignItems='center' >
              <Image
                src={speaker.photoUrl}
                borderRadius="50%"
                maxH={{ base: "200px", md: "250px" }}
                objectFit="cover"
                boxShadow="lg"
              />
            </Box>
            <Box w="100%" display="flex" flexDirection="column" gap={3}>
              <UserDetailsRow field="Name" value={speaker.name} />
              <UserDetailsRow field="Date" value={speaker.date} />
              <UserDetailsRow field="Session Description" value={truncateString(speaker.sessionText.join("\n\n "), 20)} />
              <UserDetailsRow field="Biography" value={truncateString(speaker.bioText.join("\n\n "), 20)} />
              <UserDetailsRow field="Website" value={truncateString(speaker.websiteUrl, 20)} />
              <UserDetailsRow field="Photo URL" value={truncateString(speaker.photoUrl, 20)} />
              <UserDetailsRow field="Session Recording URL" value={speaker.sessionRecordingUrl} />
            </Box>
          </Box>
          <Box display='flex' gap={4} justifyContent='center'>
          </Box> 
        </Box>
    )
};
export default GuestSpeakerProfile;
