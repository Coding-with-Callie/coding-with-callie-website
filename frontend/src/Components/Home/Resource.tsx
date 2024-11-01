import { Textarea, useMediaQuery } from "@chakra-ui/react";
import Section from "../Section";
import TextWithImageAndButton from "./TextWithImageAndButton";
import BodyText from "../BodyText";
import { ResourceType } from "../../Pages/Home";
import { useState } from "react";

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
  const [edit, setEdit] = useState(false);
  const [textBlocksValue, setTextBlocksValue] = useState(
    textBlocks.join("\n\n")
  );

  const onChangeBodyText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextBlocksValue(e.target.value);
  };

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
          edit={edit}
          setEdit={setEdit}
        >
          {edit ? (
            <Textarea
              layerStyle="input"
              variant="filled"
              id="bodyText"
              value={textBlocksValue}
              onChange={onChangeBodyText}
              isInvalid={textBlocksValue === ""}
              height={293}
            />
          ) : (
            <BodyText textBlocks={textBlocks} textAlignCenter={false} />
          )}
        </TextWithImageAndButton>
      </Section>
    </>
  );
};

export default Resource;
