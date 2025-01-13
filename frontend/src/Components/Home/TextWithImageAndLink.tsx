import { Box, useMediaQuery } from "@chakra-ui/react";
import ImageWithBorder from "./ImageWithBorder";
import { Link } from "react-router-dom";
import MyButton from "../MyButton";
import BodyText from "../BodyText";
import { TextWithImageAndLinkType } from "../../Pages/Page";
import BodyHeading from "../BodyHeading";

type Props = {
  data: TextWithImageAndLinkType;
};

const TextWithImageAndLink = ({ data }: Props) => {
  const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");

  return (
    <Box w="100%">
      <BodyHeading>{data.heading}</BodyHeading>
      <Box
        display="flex"
        flexDirection={isLargerThan1300 ? "row" : "column"}
        gap={10}
        mb={6}
        alignItems="center"
      >
        <BodyText textBlocks={data.bodyText} />
        <ImageWithBorder imageUrl={data.imageUrl} />
      </Box>
      <Link to={data.linkUrl} target={data.target ? "_blank" : "_self"}>
        <MyButton>{data.buttonText}</MyButton>
      </Link>
    </Box>
  );
};

export default TextWithImageAndLink;
