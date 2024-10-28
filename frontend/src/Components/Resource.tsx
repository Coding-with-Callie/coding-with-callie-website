import { useMediaQuery } from "@chakra-ui/react";
import Section from "./Section";
import TextWithImageAndButton from "./Home/TextWithImageAndButton";
import BodyText from "./BodyText";

type Props = {
  heading: string;
  textBlocks: string[];
  linkUrl: string;
  buttonText: string;
  imageUrl: string;
  target: "_blank" | "_self";
};

const Resource = ({
  heading,
  textBlocks,
  linkUrl,
  buttonText,
  imageUrl,
  target,
}: Props) => {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  return (
    <Section screenSizeParameter={isLargerThan900} alignItemsCenter={false}>
      <TextWithImageAndButton
        heading={heading}
        imageUrl={imageUrl}
        linkUrl={linkUrl}
        buttonText={buttonText}
        target={target}
      >
        <BodyText textBlocks={textBlocks} textAlignCenter={false} />
      </TextWithImageAndButton>
    </Section>
  );
};

export default Resource;
