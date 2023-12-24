import { FormControl, FormLabel, Input, Box } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";

const LogIn = () => {
  const data = useLoaderData();
  const [userData, setUserData] = useState<any>(data);
  const [submitClicked, setSubmitClicked] = useState(false);
  const navigate = useNavigate();

  const context: Context = useOutletContext();
  context.updateUser(data);

  const showNotification = (message: string, type: "success" | "error") => {
    toast[type](message, { toastId: `${type}-${message}` });
  };

  const onSubmit = () => {
    if (
      userData.username &&
      userData.username !== "" &&
      userData.password &&
      userData.password !== ""
    ) {
      axios
        .post(
          `${
            process.env.REACT_APP_API || "http://localhost:3001/api"
          }/auth/login`,
          userData
        )
        .then((response) => {
          const token = response?.data.access_token;
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
              console.log("HERE");
              showNotification(
                `Welcome back, ${response.data.username}!`,
                "success"
              );

              navigate("/");
            });
        })
        .catch((error) => {
          if (error.response.data.message === "Unauthorized") {
            const emptyUser = {
              name: "",
              email: "",
              username: "",
              password: "",
            };
            setUserData(emptyUser);
            showNotification("You entered incorrect credentials.", "error");
          }
        });
    } else {
      setSubmitClicked(true);
    }
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
      <BodyHeading textAlignCenter={true}>Log in!</BodyHeading>
      <FormControl display="flex" flexDirection="column" gap={6}>
        <Box>
          <FormLabel layerStyle="input">Username</FormLabel>
          <Input
            type="text"
            layerStyle="input"
            variant="filled"
            value={userData?.username}
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
            value={userData?.password}
            onChange={onChangePassword}
            isInvalid={
              submitClicked && (!userData.password || userData.password === "")
            }
          />
        </Box>
        <MyButton onClick={onSubmit}>Submit</MyButton>
      </FormControl>
    </Section>
  );
};

export default LogIn;
