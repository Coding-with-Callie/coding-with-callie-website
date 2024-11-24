import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Box,
} from "@chakra-ui/react";
import MyButton from "../MyButton";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosPublic } from "../../helpers/axios_instances";
import { isInvalidEmail } from "../../helpers/helpers";
import { Context } from "../../App";

type UserData = {
  name: string;
  email: string;
  username: string;
  password: string;
};

const SignUpForm = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [submitClicked, setSubmitClicked] = useState(false);
  const [photo, setPhoto] = useState();

  const { updateUser } = useOutletContext() as Context;
  const navigate = useNavigate();

  const showNotification = (message: string, type: "success" | "error") => {
    toast[type](message, { toastId: "success" });
  };

  const onSubmit = () => {
    if (
      userData.name === "" ||
      userData.username === "" ||
      userData.password === "" ||
      userData.email === "" ||
      isInvalidEmail(userData.email)
    ) {
      setSubmitClicked(true);
      return;
    }
    const formData = new FormData();

    if (photo) {
      formData.append("file", photo);
    }

    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("username", userData.username);
    formData.append("password", userData.password);

    axiosPublic
      .post("/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        updateUser(response.data);
        showNotification(
          `Welcome to Coding with Callie, ${response.data.username}!`,
          "success"
        );
        navigate("/");
      })
      .catch((error) => {
        showNotification(
          error.message || `An error occurred. Please try again!`,
          "error"
        );
        if (error.path) {
          navigate(error.path);
        }
      });
  };

  const onChangeUserData = (e: any) => {
    const field = e.target.id;
    const value = e.target.value;
    setUserData({ ...userData, [field]: value });

    setSubmitClicked(false);
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
          onChange={onChangeUserData}
          isInvalid={submitClicked && userData.name === ""}
        />
      </Box>
      <Box>
        <FormLabel layerStyle="input">Email address</FormLabel>
        <Input
          type="email"
          layerStyle="input"
          variant="filled"
          id="email"
          value={userData.email}
          onChange={onChangeUserData}
          isInvalid={
            submitClicked &&
            (userData.email === "" || isInvalidEmail(userData.email))
          }
        />
        {submitClicked && isInvalidEmail(userData.email) && (
          <FormHelperText color="red">
            Please enter a valid email.
          </FormHelperText>
        )}
      </Box>
      <Box>
        <FormLabel layerStyle="input">Username</FormLabel>
        <Input
          type="text"
          layerStyle="input"
          variant="filled"
          id="username"
          value={userData.username}
          onChange={onChangeUserData}
          isInvalid={submitClicked && userData.username === ""}
        />
      </Box>
      <Box>
        <FormLabel layerStyle="input">Password</FormLabel>
        <Input
          type="password"
          layerStyle="input"
          variant="filled"
          id="password"
          value={userData.password}
          onChange={onChangeUserData}
          isInvalid={submitClicked && userData.password === ""}
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
