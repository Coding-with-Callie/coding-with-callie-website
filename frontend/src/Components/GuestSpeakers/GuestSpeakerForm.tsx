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
  import { toast } from "react-toastify";
  import axios from "axios";
  import { host } from "../..";
  import BodyHeading from "../BodyHeading";
  import { useEffect } from "react";
  import { useLoaderData } from "react-router-dom";

  export type Profile = {
    role: string;
    };
  
  const GuestSpeakerForm = () => {
    const data = useLoaderData() as { loaderData: Profile };
    const role = data.loaderData.role;

    const [speakerData, setSpeakerData] = useState<any>({});
    const [submitClicked, setSubmitClicked] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
  
    const showNotification = (message: string, type: "success" | "error") => {
      toast[type](message, { toastId: "success" });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && role === 'admin') {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setUserRole(role);
        }
      }, [role]);

      const validURL = (str: string) => {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
      }
  
    const onSubmit = () => {
      setSubmitClicked(true);
      if (
        speakerData.name &&
        speakerData.name !== "" &&
        speakerData.date &&
        speakerData.date !== "" &&
        speakerData.sessionText &&
        speakerData.sessionText !== "" &&
        speakerData.bioText &&
        speakerData.bioText !== "" &&
        speakerData.websiteUrl &&
        speakerData.websiteUrl !== "" &&
        validURL(speakerData.websiteUrl) &&
        speakerData.photoUrl &&
        speakerData.photoUrl !== "" &&
        validURL(speakerData.photoUrl)
      ) {
          speakerData.sessionText = speakerData.sessionText.split("\n\n").map((item: any) => item.trim());
          speakerData.bioText = speakerData.bioText.split("\n\n").map((item: any) => item.trim());
  
          console.log("SPEAKER DATA: ", speakerData)
          
          axios
          .post(`${host}/api/auth/speaker`, speakerData)
          .then((response) => {
              const emptySpeaker = {
              name: "",
              date: "",
              sessionText: "",
              bioText: "",
              websiteUrl: "",
              photoUrl: "",
              sessionRecordingUrl: "",
              };
              setSpeakerData(emptySpeaker);
              setSubmitClicked(false)
              showNotification("Guest speaker successfully added!", "success");
          })
        .catch((error) => {
            console.log("ERROR: ", error.response.data)
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
      } else {
        setSubmitClicked(true);
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

    if (userRole !== 'admin') {
        return null;
      }
  
    return (
      <Center w="100%" py={20}>
        <FormControl display="flex" flexDirection="column" gap={6} maxW={"600px"}>
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
            {submitClicked && (!speakerData.websiteUrl ||
              validURL(speakerData.websiteUrl) === false) ? (
                <FormHelperText color="red">
                  Please enter a valid url.
                </FormHelperText>
              ) : null}
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
              {submitClicked && (!speakerData.photoUrl ||
                validURL(speakerData.photoUrl) === false) ? (
                <FormHelperText color="red">
                    Please enter a valid url.
                </FormHelperText>
                ) : null}
          </Box>
          <Box>
            <FormLabel layerStyle="input">Session Recording URL</FormLabel>
            <Input
              type="text"
              layerStyle="input"
              variant="filled"
              value={speakerData.sessionRecordingUrl}
              onChange={onChangeSessionRecordingUrl}
            />
            {(validURL(speakerData.sessionRecordingUrl) === false && speakerData.sessionRecordingUrl) ? (
              <FormHelperText color="red">
                Please enter a valid url.
              </FormHelperText>
              ) : null}
          </Box>
          <MyButton onClick={onSubmit}>Submit</MyButton>
        </FormControl>
      </Center>
    );
  };
  
  export default GuestSpeakerForm;
