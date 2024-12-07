import { AspectRatio, Box, Image } from "@chakra-ui/react";
import BodyHeading from "../BodyHeading";
import Paragraph from "../Paragraph";
import MyButton from "../MyButton";
import { Workshop } from "../../Pages/Workshops";

type Props = {
  workshop: Workshop;
  index: number;
};

const WorkshopTile = ({ workshop, index }: Props) => {
  const openWorkshopInNewTab = () => {
    if (workshop.name === "Deploy in Public Challenge") {
      window.open(
        "https://callie-stoscup-s-school.teachable.com/p/deploy-in-public-challenge",
        "_blank",
        "noreferrer"
      );
    } else {
      window.open(
        "https://callie-stoscup-s-school.teachable.com/p/build-in-public-challenge",
        "_blank",
        "noreferrer"
      );
    }
  };

  return (
    <Box
      backgroundColor="white"
      borderRadius={4}
      p={10}
      boxShadow="lg"
      flex={1}
      display="flex"
      flexDirection="column"
      gap={10}
      minW="350px"
      key={index}
    >
      <BodyHeading textAlign="center">{workshop.name}</BodyHeading>
      <Box flex={1}>
        <Paragraph>{workshop.description}</Paragraph>
      </Box>
      <AspectRatio ratio={16 / 9}>
        <Image
          src={workshop.photo}
          boxShadow="lg"
          borderRadius={4}
          objectFit="cover"
        />
      </AspectRatio>
      <MyButton onClick={openWorkshopInNewTab}>Learn More</MyButton>
    </Box>
  );
};

export default WorkshopTile;
