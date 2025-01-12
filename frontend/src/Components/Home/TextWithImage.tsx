import { Box, Image, useMediaQuery } from "@chakra-ui/react";
import BodyHeading from "../BodyHeading";
import BodyText from "../BodyText";

type TextWithImageType = {
  imageUrl: string;
  heading: string;
  bodyText: string[];
};

type Props = {
  data: TextWithImageType;
};

const TextWithImage = ({ data }: Props) => {
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");
  const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");

  return (
    <Box
      display="flex"
      gap={10}
      flexDirection={isLargerThan1300 ? "row" : "column"}
      alignItems="center"
    >
      <Image
        src={data.imageUrl}
        border="1px solid #A9A9A9"
        borderRadius="50%"
        h={isLargerThan500 ? "350px" : "250px"}
        boxShadow="lg"
        w={isLargerThan500 ? "350px" : "250px"}
      />
      <Box>
        <BodyHeading>{data.heading}</BodyHeading>
        <BodyText textBlocks={data.bodyText} />
      </Box>
    </Box>
  );
};

export default TextWithImage;
