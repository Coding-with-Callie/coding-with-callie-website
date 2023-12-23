import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";

export type SignUpData = {
  token: boolean;
};

const SignUp = () => {
  const [userData, setUserData] = useState<any>({});
  const [submitClicked, setSubmitClicked] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const context: Context = useOutletContext();
  const { token } = useLoaderData() as SignUpData;
  const navigate = useNavigate();

  const onSubmit = () => {
    if (
      userData.name &&
      userData.name !== "" &&
      userData.email &&
      userData.email !== "" &&
      userData.username &&
      userData.username !== "" &&
      userData.password &&
      userData.password !== ""
    ) {
      setFormSent(true);
      axios
        .post("http://localhost:3001/api/auth/signup", userData)
        .then((response) => {
          const token = response.data.access_token;
          localStorage.setItem("token", token);
          axios
            .get("http://localhost:3001/api/auth/profile", {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
              context.updateUser(response.data);
            });
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
        {formSent
          ? "Welcome to the Coding with Callie community!"
          : "Join the Coding with Callie community!"}
      </BodyHeading>
      {formSent ? (
        <div>Put buttons to link to other pages here</div>
      ) : (
        <FormControl display="flex" flexDirection="column" gap={6}>
          <Box>
            <FormLabel layerStyle="input">Name</FormLabel>
            <Input
              type="text"
              layerStyle="input"
              variant="filled"
              id="name"
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
              onChange={onChangeEmail}
              isInvalid={
                submitClicked && (!userData.email || userData.email === "")
              }
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
          </Box>
          <Box>
            <FormLabel layerStyle="input">Username</FormLabel>
            <Input
              type="text"
              layerStyle="input"
              variant="filled"
              onChange={onChangeUsername}
              isInvalid={
                submitClicked &&
                (!userData.username || userData.username === "")
              }
            />
          </Box>
          <Box>
            <FormLabel layerStyle="input">Password</FormLabel>
            <Input
              type="password"
              layerStyle="input"
              variant="filled"
              onChange={onChangePassword}
              isInvalid={
                submitClicked &&
                (!userData.password || userData.password === "")
              }
            />
          </Box>
          <MyButton onClick={onSubmit}>Submit</MyButton>
          {token ? (
            <MyButton onClick={() => navigate("/log-in")}>
              Log in instead?
            </MyButton>
          ) : null}
        </FormControl>
      )}
    </Section>
  );
};

export default SignUp;
