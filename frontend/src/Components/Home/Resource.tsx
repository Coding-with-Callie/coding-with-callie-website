import { useMediaQuery } from "@chakra-ui/react";
import Section from "../Section";
import TextWithImageAndButton from "./TextWithImageAndButton";
import BodyText from "../BodyText";
import { ResourceType } from "../../Pages/Home";

type Props = {
  id: number;
  heading: string;
  textBlocks: string[];
  linkUrl: string;
  buttonText: string;
  imageUrl: string;
  target: "_blank" | "_self";
  editable: boolean;
  setResources: React.Dispatch<React.SetStateAction<ResourceType[]>>;
};

const Resource = ({
  id,
  heading,
  textBlocks,
  linkUrl,
  buttonText,
  imageUrl,
  target,
  editable,
  setResources,
}: Props) => {
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");

  return (
    <>
      <Section screenSizeParameter={isLargerThan900} alignItemsCenter={false}>
        <TextWithImageAndButton
          heading={heading}
          imageUrl={imageUrl}
          linkUrl={linkUrl}
          buttonText={buttonText}
          target={target}
          editable={editable}
          setResources={setResources}
          id={id}
        >
          <BodyText textBlocks={textBlocks} textAlignCenter={false} />
        </TextWithImageAndButton>
      </Section>
    </>
  );
};

export default Resource;
