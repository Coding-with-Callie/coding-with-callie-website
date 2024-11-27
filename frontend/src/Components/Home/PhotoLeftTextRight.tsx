import { Box, Image, useMediaQuery } from "@chakra-ui/react";
import Section from "../Section";
import BodyHeading from "../BodyHeading";
import BodyText from "../BodyText";

type Props = {
  heading: string;
  text: string[];
  image: string;
};

const PhotoLeftTextRight = ({ heading, text, image }: Props) => {
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  return (
    <Section
      screenSizeParameter={isLargerThan700}
      alignItemsCenter={true}
      gapSize={10}
      direction={isLargerThan900 ? "row" : "column"}
    >
      <Image
        src={image}
        borderRadius="50%"
        h={isLargerThan500 ? "350px" : "280px"}
        boxShadow="lg"
      />
      <Box>
        <BodyHeading>{heading}</BodyHeading>
        <BodyText textBlocks={text} />
      </Box>
    </Section>
  );
};

export default PhotoLeftTextRight;
