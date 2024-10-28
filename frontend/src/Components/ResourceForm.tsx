import {
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import BodyHeading from "./BodyHeading";
import MyButton from "./MyButton";
import { useState } from "react";
import { validURL } from "../helpers/helpers";
import axios from "axios";
import { host } from "..";
import { ResourceType } from "../Pages/Home";

type Props = {
  setResources: React.Dispatch<React.SetStateAction<ResourceType[]>>;
};

const ResourceForm = ({ setResources }: Props) => {
  const [heading, setHeading] = useState<string>("");
  const [bodyText, setBodyText] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [buttonText, setButtonText] = useState<string>("");
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [target, setTarget] = useState<boolean>(true);
  const [submitClicked, setSubmitClicked] = useState(false);

  const onChangeHeading = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeading(e.target.value);
  };

  const onChangeBodyText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyText(e.target.value);
  };

  const onChangeImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  const onChangeButtonText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setButtonText(e.target.value);
  };

  const onChangeLinkUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkUrl(e.target.value);
  };

  const onChangeTarget = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTarget(e.target.checked);
  };

  const onSubmit = () => {
    setSubmitClicked(true);

    if (
      heading === "" ||
      bodyText === "" ||
      imageUrl === "" ||
      !validURL(imageUrl) ||
      buttonText === "" ||
      linkUrl === ""
    ) {
      return;
    }

    const description: string[] = bodyText
      .split("\n\n")
      .map((item: any) => item.trim());

    axios
      .post(
        `${host}/api/auth/resource`,
        {
          heading,
          bodyText: description,
          imageUrl,
          buttonText,
          linkUrl,
          target,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setResources(response.data);

        setHeading("");
        setBodyText("");
        setImageUrl("");
        setButtonText("");
        setLinkUrl("");
        setTarget(true);
        setSubmitClicked(false);
      });
  };

  return (
    <Box
      backgroundColor="white"
      padding={10}
      borderRadius={5}
      maxW={"600px"}
      margin="0 auto"
    >
      <FormControl display="flex" flexDirection="column" gap={6}>
        <BodyHeading textAlignCenter={true} removeMargin>
          Create Resource
        </BodyHeading>
        <Box>
          <FormLabel layerStyle="input">Title</FormLabel>
          <Input
            type="text"
            layerStyle="input"
            variant="filled"
            id="heading"
            value={heading}
            onChange={onChangeHeading}
            isInvalid={submitClicked && heading === ""}
          />
        </Box>
        <Box>
          <FormLabel layerStyle="input">Description</FormLabel>
          <Textarea
            layerStyle="input"
            variant="filled"
            id="bodyText"
            value={bodyText}
            onChange={onChangeBodyText}
            isInvalid={submitClicked && bodyText === ""}
          />
        </Box>
        <Box>
          <FormLabel layerStyle="input">Image URL</FormLabel>
          <Input
            type="text"
            layerStyle="input"
            variant="filled"
            id="imageUrl"
            value={imageUrl}
            onChange={onChangeImageUrl}
            isInvalid={
              submitClicked && (imageUrl === "" || !validURL(imageUrl))
            }
          />
          {submitClicked && (imageUrl === "" || !validURL(imageUrl)) && (
            <FormHelperText color="red">
              Please enter a valid url.
            </FormHelperText>
          )}
        </Box>
        <Box>
          <FormLabel layerStyle="input">Button Text</FormLabel>
          <Input
            type="text"
            layerStyle="input"
            variant="filled"
            id="buttonText"
            value={buttonText}
            onChange={onChangeButtonText}
            isInvalid={submitClicked && buttonText === ""}
          />
        </Box>
        <Box>
          <FormLabel layerStyle="input">Resource Link</FormLabel>
          <Input
            type="text"
            layerStyle="input"
            variant="filled"
            id="link"
            value={linkUrl}
            onChange={onChangeLinkUrl}
            isInvalid={submitClicked && linkUrl === ""}
          />
        </Box>
        <Box>
          <Checkbox
            layerStyle="input"
            onChange={onChangeTarget}
            isChecked={target}
          >
            Open Link in New Tab
          </Checkbox>
        </Box>
        <MyButton onClick={onSubmit}>Submit</MyButton>
      </FormControl>
    </Box>
  );
};

export default ResourceForm;
