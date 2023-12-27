import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import MyButton from "../Components/MyButton";
import Paragraph from "../Components/Paragraph";
import Section from "../Components/Section";

export type SignUpData = {
  token: boolean;
};

const SignUp = () => {
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");
  const [userData, setUserData] = useState<any>({});
  const [submitClicked, setSubmitClicked] = useState(false);
  const context: Context = useOutletContext();
  const navigate = useNavigate();

  const showNotification = (message: string, type: "success" | "error") => {
    toast[type](message, { toastId: "success" });
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
      axios
        .post(
          `${
            process.env.REACT_APP_API || "http://localhost:3001/api"
          }/auth/signup`,
          userData
        )
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
            axios
              .get(
                `${
                  process.env.REACT_APP_API || "http://localhost:3001/api"
                }/auth/profile`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              )
              .then((response) => {
                context.updateUser(response.data);
                showNotification(
                  `Welcome to Coding with Callie, ${response.data.name}!`,
                  "success"
                );
                navigate("/");
              });
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

  return (
    <Section screenSizeParameter={false} alignItemsCenter={false}>
      <BodyHeading textAlignCenter={true}>
        Join the Coding with Callie community!
      </BodyHeading>
      <FormControl display="flex" flexDirection="column" gap={6}>
        <Box>
          <FormLabel layerStyle="input">Name</FormLabel>
          <Input
            type="text"
            layerStyle="input"
            variant="filled"
            id="name"
            value={userData.name}
            onChange={onChangeName}
            isInvalid={
              submitClicked && (!userData.name || userData.name === "")
            }
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
        <MyButton onClick={onSubmit}>Submit</MyButton>

        <Box
          display="flex"
          gap={2}
          alignItems="center"
          justifyContent="center"
          mt={6}
          w="100%"
          flexDirection={isLargerThan500 ? "row" : "column"}
        >
          <Paragraph margin={false}>Already have an account?</Paragraph>
          <MyButton
            onClick={() => {
              navigate("/log-in");
            }}
            widthSize={isLargerThan500 ? null : "100%"}
          >
            Sign in instead!
          </MyButton>
        </Box>
      </FormControl>
    </Section>
  );
};

export default SignUp;
