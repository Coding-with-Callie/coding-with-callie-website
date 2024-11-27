import {
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import BodyHeading from "../BodyHeading";
import MyButton from "../MyButton";
import { useState } from "react";
import { ResourceType } from "../../Pages/Home";
import { toast } from "react-toastify";
import { axiosAdmin } from "../../helpers/axios_instances";

type Props = {
  setResources: React.Dispatch<React.SetStateAction<ResourceType[]>>;
};

const ResourceForm = ({ setResources }: Props) => {
  const [heading, setHeading] = useState<string>("");
  const [bodyText, setBodyText] = useState<string>("");
  const [fileInputKey, setFileInputKey] = useState<string>("");
  const [image, setImage] = useState();
  const [buttonText, setButtonText] = useState<string>("");
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [target, setTarget] = useState<boolean>(true);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeHeading = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeading(e.target.value);
  };

  const onChangeBodyText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyText(e.target.value);
  };

  const onChangeImage = (e: React.ChangeEvent<any>) => {
    setImage(e.target.files[0]);
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
      buttonText === "" ||
      linkUrl === ""
    ) {
      return;
    }

    const formData = new FormData();
    if (image) {
      formData.append("file", image);
    }
    formData.append("heading", heading);
    formData.append("bodyText", bodyText);
    formData.append("buttonText", buttonText);
    formData.append("linkUrl", linkUrl);
    formData.append("target", target.toString());

    setLoading(true);

    axiosAdmin
      .post("/resource", formData)
      .then((response) => {
        setResources(response.data);
        setLoading(false);
        toast.success("Resource created successfully");
        window.scrollTo(0, 0);

        setHeading("");
        setBodyText("");
        setButtonText("");
        setLinkUrl("");
        setFileInputKey(new Date().getTime().toString());
        setTarget(true);
        setSubmitClicked(false);
      })
      .catch(() => {
        toast.error("Error creating resource");
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
        <BodyHeading textAlign="center" mb={0}>
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
          <FormLabel layerStyle="input">Resource Image</FormLabel>
          <Input
            p={0}
            border="none"
            borderRadius="0px"
            type="file"
            accept="image/*"
            onChange={onChangeImage}
            color="#45446A"
            key={fileInputKey}
          />
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
        <MyButton onClick={onSubmit}>
          {loading ? <Spinner /> : "Submit"}
        </MyButton>
      </FormControl>
    </Box>
  );
};

export default ResourceForm;
