import { Box, useMediaQuery } from "@chakra-ui/react";
import Section from "./Section";
import TextWithImageAndButton from "./Home/TextWithImageAndButton";
import BodyText from "./BodyText";
import MyButton from "./MyButton";
import axios from "axios";
import { host } from "..";
import { ResourceType } from "../Pages/Home";

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

  const deleteResource = () => {
    axios
      .delete(`${host}/api/auth/resource/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setResources(response.data);
      });
  };

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
      {editable && (
        <Box display="flex" gap={4} mt={4}>
          <MyButton widthSize="50%">Edit</MyButton>
          <MyButton widthSize="50%" onClick={deleteResource}>
            Delete
          </MyButton>
        </Box>
      )}
    </Section>
  );
};

export default Resource;
