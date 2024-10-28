import { Box, useMediaQuery } from "@chakra-ui/react";
import BodyHeading from "../BodyHeading";
import ImageWithBorder from "./ImageWithBorder";
import { Link } from "react-router-dom";
import MyButton from "../MyButton";

type Props = {
  children: React.ReactNode;
  heading: string;
  imageUrl: string;
  linkUrl: string;
  buttonText: string;
  target: "_blank" | "_self";
};

const TextWithImageAndButton = ({
  children,
  heading,
  imageUrl,
  linkUrl,
  buttonText,
  target,
}: Props) => {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  return (
    <Box w="100%">
      <BodyHeading textAlignCenter={false}>{heading}</BodyHeading>
      <Box
        display="flex"
        flexDirection={isLargerThan900 ? "row" : "column"}
        gap={10}
        mb={10}
        alignItems="center"
      >
        {children}
        <ImageWithBorder imageUrl={imageUrl} />
      </Box>
      <Link to={linkUrl} target={target === "_blank" ? "_blank" : "_self"}>
        <MyButton widthSize="100%">{buttonText}</MyButton>
      </Link>
    </Box>
  );
};

export default TextWithImageAndButton;
