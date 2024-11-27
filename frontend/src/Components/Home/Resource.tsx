import { Box, Textarea, useMediaQuery } from "@chakra-ui/react";
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
  order: number;
  numResources: number;
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
  order,
  numResources,
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
    <Box id={order.toString()}>
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
          textBlocksValue={textBlocksValue}
          order={order}
          numResources={numResources}
          setTextBlocksValue={setTextBlocksValue}
          bodyText={textBlocks.join("\n\n")}
        >
          {edit ? (
            <Textarea
              layerStyle="inputResource"
              variant="filled"
              id="bodyText"
              value={textBlocksValue}
              onChange={onChangeBodyText}
              isInvalid={textBlocksValue === ""}
              height={293}
              _hover={{ backgroundColor: "gray.50" }}
              _focus={{ backgroundColor: "white" }}
            />
          ) : (
            <BodyText textBlocks={textBlocks} />
          )}
        </TextWithImageAndButton>
      </Section>
    </Box>
  );
};

export default Resource;
