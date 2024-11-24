import { FormControl } from "@chakra-ui/react";
import TextInput from "../Forms/TextInput";
import MyButton from "../MyButton";
import { showNotification } from "../..";
import { useNavigate, useOutletContext } from "react-router-dom";
import { axiosPublic } from "../../helpers/axios_instances";
import { useState } from "react";
import { Context } from "../../App";

type UserData = {
  username: string;
  password: string;
};

const LogInForm = () => {
  const [userData, setUserData] = useState<UserData>({
    username: "",
    password: "",
  });
  const [submitClicked, setSubmitClicked] = useState(false);

  const { updateUser } = useOutletContext() as Context;
  const navigate = useNavigate();

  const onChangeUserData = (e: any) => {
    setSubmitClicked(false);
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const onSubmit = () => {
    if (userData.username === "" || userData.password === "") {
      setSubmitClicked(true);
      return;
    }
    axiosPublic
      .post("/login", userData)
      .then((response) => {
        updateUser(response.data);

        showNotification(`Welcome back, ${response.data.username}!`, "success");
        navigate("/");
      })
      .catch((error) => {
        setUserData({ ...userData, password: "" });
        showNotification(
          error.message || `An error occurred. Please try again!`,
          "error"
        );
      });
  };

  return (
    <FormControl display="flex" flexDirection="column" gap={6} maxW={"600px"}>
      <TextInput
        field="Username"
        onChange={onChangeUserData}
        value={userData?.username || ""}
        isInvalid={submitClicked && userData.username === ""}
      />
      <TextInput
        field="Password"
        onChange={onChangeUserData}
        value={userData?.password || ""}
        isInvalid={submitClicked && userData.password === ""}
        type="password"
      />
      <MyButton onClick={onSubmit}>Submit</MyButton>
    </FormControl>
  );
};

export default LogInForm;
