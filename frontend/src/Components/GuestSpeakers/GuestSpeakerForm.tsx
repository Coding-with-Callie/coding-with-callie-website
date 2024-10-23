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
  import { useNavigate } from "react-router-dom";

  
  const GuestSpeakerForm = () => {
    const [role, setRole] = useState<string | null>(null);
    const [speakerData, setSpeakerData] = useState<any>({});
    const [submitClicked, setSubmitClicked] = useState(false);
    const [isCreated, setIsCreated] = useState(false);

    const navigate = useNavigate();
  
    const showNotification = (message: string, type: "success" | "error") => {
      toast[type](message, { toastId: "success" });
    };

    const profileLoader = async () => {
      const token = localStorage.getItem("token");
    
      if (token) {
        try {
          const response = await axios.get(`${host}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return response.data.role;
        } catch (error) {
          console.error("Failed to fetch profile:", error);
          return null; 
        }
      } else {
        return null; 
      }
    };

    useEffect(() => {
      const loadProfile = async () => {
        const userRole = await profileLoader();
        setRole(userRole);
      }
      loadProfile();

        if (isCreated) {
          navigate("/guest-speakers")
          setIsCreated(false);
        }
      }, [profileLoader, isCreated, navigate]);

      const validURL = (str: string) => {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
      }
  
    const onSubmit = async () => {
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
          
          const [year, month, day] = speakerData.date.split('-').map(Number);
          const dateValue = new Date(year, month - 1, day);
          const options: Intl.DateTimeFormatOptions = {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
          };
          speakerData.date = dateValue.toLocaleDateString('en-US', options);
          
          await axios
          .post(`${host}/api/auth/speaker`, speakerData)
          .then(() => {
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
              setIsCreated(true);
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

    if (role !== 'admin') {
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
                submitClicked && !speakerData.date
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
            <FormLabel layerStyle="input">About</FormLabel>
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
