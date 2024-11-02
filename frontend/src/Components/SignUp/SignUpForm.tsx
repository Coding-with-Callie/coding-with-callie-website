import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Box,
} from "@chakra-ui/react";
import MyButton from "../MyButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosPrivate, axiosPublic } from "../../helpers/axios_instances";

type Props = {
  updateUser: (newUser: any) => void;
};

const SignUpForm = ({ updateUser }: Props) => {
  const [userData, setUserData] = useState<any>({});
  const [submitClicked, setSubmitClicked] = useState(false);

  const navigate = useNavigate();

  const showNotification = (message: string, type: "success" | "error") => {
    toast[type](message, { toastId: "success" });
  };

  const [photo, setPhoto] = useState();
  const onFileUpload = (id: number) => {
    if (photo) {
      const formData = new FormData();
      formData.append("file", photo);
      axiosPrivate
        .post(`/upload-profile-image?id=${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          updateUser(response.data);
        })
        .catch((error) => {
          if (error.response.data.message === "Unauthorized") {
            showNotification(
              "It looks like your session has expired. Please log in again to view Coding with Callie resources!",
              "error"
            );
            navigate("/log-in");
          } else {
            let message: string = error.response.data.message[0];
            showNotification(`${message}`, "error");
          }
        });
    }
  };

  const onSubmit = () => {
    if (
      userData.name &&
      userData.name !== "" &&
      userData.email &&
      userData.email !== "" &&
      userData.email.indexOf("@") !== -1 &&
      userData.username &&
      userData.username !== "" &&
      userData.password &&
      userData.password !== ""
    ) {
      axiosPublic
        .post("/auth/signup", userData)
        .then((response) => {
          if (response.data === "user already exists") {
            const emptyUser = {
              name: "",
              email: "",
              username: "",
              password: "",
            };
            setUserData(emptyUser);
            showNotification("User already exists!", "error");
          } else if (response.data === "email already exists") {
            const emptyUser = {
              name: "",
              email: "",
              username: "",
              password: "",
            };
            setUserData(emptyUser);
            showNotification("Email already exists!", "error");
          } else {
            const token = response.data.access_token;
            localStorage.setItem("token", token);
            axiosPrivate.get("/profile").then(async (response) => {
              updateUser(response.data);

              if (photo) {
                onFileUpload(response.data.id);
              }

              showNotification(
                `Welcome to Coding with Callie, ${response.data.username}!`,
                "success"
              );
              navigate("/");
            });
          }
        })
        .catch((error) => {
          if (error.response.data.message === "Unauthorized") {
            showNotification(
              "It looks like your session has expired. Please log in again to view Coding with Callie resources!",
              "error"
            );
            navigate("/log-in");
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
    setUserData({ ...userData, name: e.target.value });
  };

  const onChangeEmail = (e: any) => {
    setSubmitClicked(false);
    setUserData({ ...userData, email: e.target.value });
  };

  const onChangeUsername = (e: any) => {
    setSubmitClicked(false);
    setUserData({ ...userData, username: e.target.value });
  };

  const onChangePassword = (e: any) => {
    setSubmitClicked(false);
    setUserData({ ...userData, password: e.target.value });
  };

  const onChangePhoto = (e: any) => {
    setSubmitClicked(false);
    setPhoto(e.target.files[0]);
  };

  return (
    <FormControl display="flex" flexDirection="column" gap={6} maxW={"600px"}>
      <Box>
        <FormLabel layerStyle="input">Name</FormLabel>
        <Input
          type="text"
          layerStyle="input"
          variant="filled"
          id="name"
          value={userData.name}
          onChange={onChangeName}
          isInvalid={submitClicked && (!userData.name || userData.name === "")}
        />
      </Box>
      <Box>
        <FormLabel layerStyle="input">Email address</FormLabel>
        <Input
          type="email"
          layerStyle="input"
          variant="filled"
          value={userData.email}
          onChange={onChangeEmail}
          isInvalid={
            submitClicked &&
            (!userData.email ||
              userData.email === "" ||
              userData.email.indexOf("@") === -1)
          }
        />
        {submitClicked && userData.email.indexOf("@") === -1 ? (
          <FormHelperText color="red">
            Please enter a valid email.
          </FormHelperText>
        ) : (
          <FormHelperText>We'll never share your email.</FormHelperText>
        )}
      </Box>
      <Box>
        <FormLabel layerStyle="input">Username</FormLabel>
        <Input
          type="text"
          layerStyle="input"
          variant="filled"
          value={userData.username}
          onChange={onChangeUsername}
          isInvalid={
            submitClicked && (!userData.username || userData.username === "")
          }
        />
      </Box>
      <Box>
        <FormLabel layerStyle="input">Password</FormLabel>
        <Input
          type="password"
          layerStyle="input"
          variant="filled"
          value={userData.password}
          onChange={onChangePassword}
          isInvalid={
            submitClicked && (!userData.password || userData.password === "")
          }
        />
      </Box>
      <Box>
        <FormLabel layerStyle="input">Profile Photo</FormLabel>
        <Input
          p={0}
          border="none"
          borderRadius="0px"
          type="file"
          accept="image/*"
          onChange={onChangePhoto}
          color="#45446A"
        />
      </Box>
      <MyButton onClick={onSubmit}>Submit</MyButton>
    </FormControl>
  );
};

export default SignUpForm;
