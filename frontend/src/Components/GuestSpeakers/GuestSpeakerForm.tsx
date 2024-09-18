import {
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Box,
    Textarea,
    Center,
  } from "@chakra-ui/react";
  import MyButton from "../MyButton";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { toast } from "react-toastify";
  import axios from "axios";
  import { host } from "../..";
import BodyHeading from "../BodyHeading";
  
  type Props = {
    updateCheckoutStep?: (newStep: number) => void;
    onClose?: () => void;
    updateSpeaker: (newSpeaker: any) => void;
  };
  
  const GuestSpeakerForm = () => {
    const [speakerData, setSpeakerData] = useState<any>({});
    const [submitClicked, setSubmitClicked] = useState(false);
  
    const navigate = useNavigate();
  
    const showNotification = (message: string, type: "success" | "error") => {
      toast[type](message, { toastId: "success" });
    };
  
  
    const onSubmit = () => {
      if (
        speakerData.name &&
        speakerData.name !== "" &&
        speakerData.date &&
        speakerData.date !== "" &&
        speakerData.time &&
        speakerData.time !== "" &&
        speakerData.sessionText &&
        speakerData.sessionText !== "" &&
        speakerData.bioText &&
        speakerData.bioText !== "" &&
        speakerData.websiteUrl &&
        speakerData.websiteUrl !== "" &&
        speakerData.photoUrl &&
        speakerData.photoUrl !== "" &&
        speakerData.sessionRecordingUrl &&
        speakerData.sessionRecordingUrl !== ""
      ) { console.log("SPEAKER DATA: ", speakerData)
    //     axios
    //       .post(`${host}/api/auth/speakers`, speakerData)
    //       .then((response) => {
    //         if (response.data === "speaker already exists") {
    //           const emptySpeaker = {
    //             name: "",
    //             email: "",
    //             username: "",
    //             password: "",
    //           };
    //           setSpeakerData(emptySpeaker);
    //           showNotification("User already exists!", "error");
    //         } else if (response.data === "email already exists") {
    //           const emptySpeaker = {
    //             name: "",
    //             email: "",
    //             username: "",
    //             password: "",
    //           };
    //           setSpeakerData(emptySpeaker);
    //           showNotification("Email already exists!", "error");
    //         } else {
    //           const token = response.data.access_token;
    //           localStorage.setItem("token", token);
    //           axios
    //             .get(`${host}/api/auth/profile`, {
    //               headers: { Authorization: `Bearer ${token}` },
    //             })
    //             .then(async (response) => {
    //               updateUser(response.data);            
  
    //               showNotification(
    //                 `Welcome to Coding with Callie, ${response.data.username}!`,
    //                 "success"
    //               );
    //               navigate("/");
    //             });
    //         }
    //       })
    //       .catch((error) => {
    //         if (error.response.data.message === "Unauthorized") {
    //           showNotification(
    //             "It looks like your session has expired. Please log in again to view Coding with Callie resources!",
    //             "error"
    //           );
    //           navigate("/log-in");
    //         } else {
    //           let message: string = error.response.data.message[0];
    //           showNotification(`${message}`, "error");
    //         }
    //       });
    //   } else {
    //     setSubmitClicked(true);
      }
    };

    const onChangeName = (e: any) => {
      setSubmitClicked(false);
      setSpeakerData({ ...speakerData, name: e.target.value });
    };
  
    const onChangeDate = (e: any) => {
      setSubmitClicked(false);
      setSpeakerData({ ...speakerData, date: e.target.value });
    };
  
    const onChangeTime = (e: any) => {
      setSubmitClicked(false);
      setSpeakerData({ ...speakerData, time: e.target.value });
    };
  
    const onChangeSessionText = (e: any) => {
      setSubmitClicked(false);
      setSpeakerData({ ...speakerData, sessionText: e.target.value });
    };

    const onChangeBioText = (e: any) => {
        setSubmitClicked(false);
        setSpeakerData({ ...speakerData, bioText: e.target.value });
    };
    
    const onChangeWebsiteUrl = (e: any) => {
        setSubmitClicked(false);
        setSpeakerData({ ...speakerData, websiteUrl: e.target.value });
    };

    const onChangePhotoUrl = (e: any) => {
        setSubmitClicked(false);
        setSpeakerData({ ...speakerData, photoUrl: e.target.value });
    };

    const onChangeSessionRecordingUrl = (e: any) => {
        setSubmitClicked(false);
        setSpeakerData({ ...speakerData, sessionRecordingUrl: e.target.value });
    };
  
    return (
      <Center w="100%" py={20}>
        <FormControl display="flex" flexDirection="column" gap={6} maxW={"600px"}>
          <BodyHeading textAlignCenter={true} removeMargin>
            Guest Speaker Form
          </BodyHeading>
          <Box>
            <FormLabel layerStyle="input">Name</FormLabel>
            <Input
              type="text"
              layerStyle="input"
              variant="filled"
              id="name"
              value={speakerData.name}
              onChange={onChangeName}
              isInvalid={submitClicked && (!speakerData.name || speakerData.name === "")}
            />
          </Box>
          <Box>
            <FormLabel layerStyle="input">Date</FormLabel>
            <Input
              type="date"
              layerStyle="input"
              variant="filled"
              value={speakerData.date}
              onChange={onChangeDate}
              isInvalid={
                submitClicked &&
                (!speakerData.date ||
                  new Date(speakerData.date).getTime() < new Date().setHours(0, 0, 0, 0)) 
              }
            />
            {submitClicked && (!speakerData.date ||
                  new Date(speakerData.date).getTime() < new Date().setHours(0, 0, 0, 0)) ? (
                      <FormHelperText color="red">
                          Please enter a valid date.
                      </FormHelperText>
                  ) : null}
          </Box>
          <Box>
            <FormLabel layerStyle="input">Time</FormLabel>
            <Input
              type="time"
              layerStyle="input"
              variant="filled"
              value={speakerData.time}
              onChange={onChangeTime}
              isInvalid={
                submitClicked && (!speakerData.time || speakerData.time === "")
              }
            />
          </Box>
          <Box>
            <FormLabel layerStyle="input">Session Description</FormLabel>
            <Textarea
              layerStyle="input"
              variant="filled"
              value={speakerData.sessionText}
              onChange={onChangeSessionText}
              isInvalid={
                submitClicked && (!speakerData.sessionText || speakerData.sessionText === "")
              }
            />
          </Box>
          <Box>
            <FormLabel layerStyle="input">Biography</FormLabel>
            <Textarea
              layerStyle="input"
              variant="filled"
              value={speakerData.bioText}
              onChange={onChangeBioText}
              isInvalid={
                submitClicked && (!speakerData.bioText || speakerData.bioText === "")
              }
            />
          </Box>
          <Box>
            <FormLabel layerStyle="input">Website</FormLabel>
            <Input
              type="text"
              layerStyle="input"
              variant="filled"
              value={speakerData.websiteUrl}
              onChange={onChangeWebsiteUrl}
              isInvalid={
                submitClicked && (!speakerData.websiteUrl || speakerData.websiteUrl === "")
              }
            />
          </Box>
          <Box>
            <FormLabel layerStyle="input">Photo URL</FormLabel>
              <Input
                  type="text"
                  layerStyle="input"
                  variant="filled"
                  value={speakerData.photoUrl}
                  onChange={onChangePhotoUrl}
                  isInvalid={
                  submitClicked && (!speakerData.photoUrl || speakerData.photoUrl === "")
                  }
              />
          </Box>
          <Box>
            <FormLabel layerStyle="input">Session Recording URL</FormLabel>
            <Input
              type="text"
              layerStyle="input"
              variant="filled"
              value={speakerData.sessionRecordingUrl}
              onChange={onChangeSessionRecordingUrl}
              isInvalid={
                submitClicked && (!speakerData.sessionRecordingUrl || speakerData.sessionRecordingUrl === "")
              }
            />
          </Box>
          <MyButton onClick={onSubmit}>Submit</MyButton>
        </FormControl>
      </Center>
    );
  };
  
  export default GuestSpeakerForm;
