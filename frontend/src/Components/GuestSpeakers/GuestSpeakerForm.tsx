import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Box,
  Textarea,
} from "@chakra-ui/react";
import MyButton from "../MyButton";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { host } from "../..";
import BodyHeading from "../BodyHeading";
import { validURL } from "../../helpers/helpers";
import { Speaker } from "../../Pages/GuestSpeakers";

type Props = {
  setPastSpeakers: React.Dispatch<React.SetStateAction<Speaker[]>>;
  setUpcomingSpeakers: React.Dispatch<React.SetStateAction<Speaker[]>>;
};

const GuestSpeakerForm = ({ setPastSpeakers, setUpcomingSpeakers }: Props) => {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [sessionText, setSessionText] = useState<string>("");
  const [bioText, setBioText] = useState<string>("");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [image, setImage] = useState();
  const [sessionRecordingUrl, setSessionRecordingUrl] = useState<string>("");
  const [submitClicked, setSubmitClicked] = useState(false);

  const showNotification = (message: string, type: "success" | "error") => {
    toast[type](message, { toastId: "success" });
  };

  const onSubmit = async () => {
    setSubmitClicked(true);

    if (
      name === "" ||
      date === "" ||
      sessionText === "" ||
      bioText === "" ||
      websiteUrl === "" ||
      !validURL(websiteUrl)
    ) {
      return;
    }

    const [year, month, day] = date.split("-").map(Number);
    const dateValue = new Date(year, month - 1, day);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const editedDate = dateValue.toLocaleDateString("en-US", options);

    const formData = new FormData();
    if (image) {
      formData.append("file", image);
    }
    formData.append("name", name);
    formData.append("date", editedDate);
    formData.append("sessionText", sessionText);
    formData.append("bioText", bioText);
    formData.append("websiteUrl", websiteUrl);
    formData.append("sessionRecordingUrl", sessionRecordingUrl);

    const token = localStorage.getItem("token");

    await axios
      .post(`${host}/api/auth/speaker`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPastSpeakers(response.data.pastSpeakers);
        setUpcomingSpeakers(response.data.upcomingSpeakers);

        setName("");
        setDate("");
        setSessionText("");
        setBioText("");
        setWebsiteUrl("");
        setSessionRecordingUrl("");
        setSubmitClicked(false);
        showNotification("Guest speaker successfully added!", "success");
      })
      .catch((error) => {
        if (error.response.data.message === "Unauthorized") {
          showNotification(
            "It looks like your session has expired. Please log in again to create guest speaker!",
            "error"
          );
        } else {
          let message: string = error.response.data.message[0];
          showNotification(`${message}`, "error");
        }
      });
  };

  const onChangeName = (e: any) => {
    setSubmitClicked(false);
    setName(e.target.value);
  };

  const onChangeDate = (e: any) => {
    setSubmitClicked(false);
    setDate(e.target.value);
  };

  const onChangeSessionText = (e: any) => {
    setSubmitClicked(false);
    setSessionText(e.target.value);
  };

  const onChangeBioText = (e: any) => {
    setSubmitClicked(false);
    setBioText(e.target.value);
  };

  const onChangeWebsiteUrl = (e: any) => {
    setSubmitClicked(false);
    setWebsiteUrl(e.target.value);
  };

  const onChangeSessionRecordingUrl = (e: any) => {
    setSubmitClicked(false);
    setSessionRecordingUrl(e.target.value);
  };

  const onChangeImage = (e: React.ChangeEvent<any>) => {
    setImage(e.target.files[0]);
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
          Create Guest Speaker
        </BodyHeading>
        <Box>
          <FormLabel layerStyle="input">Name</FormLabel>
          <Input
            type="text"
            layerStyle="input"
            variant="filled"
            id="name"
            value={name}
            onChange={onChangeName}
            isInvalid={submitClicked && name === ""}
          />
        </Box>
        <Box>
          <FormLabel layerStyle="input">Date</FormLabel>
          <Input
            type="date"
            layerStyle="input"
            variant="filled"
            value={date}
            onChange={onChangeDate}
            isInvalid={submitClicked && date === ""}
          />
        </Box>
        <Box>
          <FormLabel layerStyle="input">Session Description</FormLabel>
          <Textarea
            layerStyle="input"
            variant="filled"
            value={sessionText}
            onChange={onChangeSessionText}
            isInvalid={submitClicked && sessionText === ""}
          />
        </Box>
        <Box>
          <FormLabel layerStyle="input">About</FormLabel>
          <Textarea
            layerStyle="input"
            variant="filled"
            value={bioText}
            onChange={onChangeBioText}
            isInvalid={submitClicked && bioText === ""}
          />
        </Box>
        <Box>
          <FormLabel layerStyle="input">Website</FormLabel>
          <Input
            type="text"
            layerStyle="input"
            variant="filled"
            value={websiteUrl}
            onChange={onChangeWebsiteUrl}
            isInvalid={
              submitClicked && websiteUrl === "" && !validURL(websiteUrl)
            }
          />
          {submitClicked && (!websiteUrl || validURL(websiteUrl) === false) ? (
            <FormHelperText color="red">
              Please enter a valid url.
            </FormHelperText>
          ) : null}
        </Box>
        <Box>
          <FormLabel layerStyle="input">Photo</FormLabel>
          <Input
            p={0}
            border="none"
            borderRadius="0px"
            type="file"
            accept="image/*"
            onChange={onChangeImage}
            color="#45446A"
          />
        </Box>
        <Box>
          <FormLabel layerStyle="input">Session Recording URL</FormLabel>
          <Input
            type="text"
            layerStyle="input"
            variant="filled"
            value={sessionRecordingUrl}
            onChange={onChangeSessionRecordingUrl}
            isInvalid={
              submitClicked &&
              websiteUrl === "" &&
              !validURL(sessionRecordingUrl)
            }
          />
          {!validURL(sessionRecordingUrl) && sessionRecordingUrl ? (
            <FormHelperText color="red">
              Please enter a valid url.
            </FormHelperText>
          ) : null}
        </Box>
        <MyButton onClick={onSubmit}>Submit</MyButton>
      </FormControl>
    </Box>
  );
};

export default GuestSpeakerForm;
