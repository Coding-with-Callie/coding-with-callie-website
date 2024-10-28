import { Box, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import Section from "./Section";
import TextWithImageAndButton from "./Home/TextWithImageAndButton";
import BodyText from "./BodyText";
import axios from "axios";
import { host } from "..";
import { ResourceType } from "../Pages/Home";
import DeleteButton from "./DeleteButton";
import { useRef } from "react";
import { toast } from "react-toastify";
import Alert from "./Profile/Alert";

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
