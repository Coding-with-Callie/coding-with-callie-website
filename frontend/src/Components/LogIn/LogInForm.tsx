import { FormControl } from "@chakra-ui/react";
import TextInput from "../Forms/TextInput";
import MyButton from "../MyButton";
import { host, showNotification } from "../..";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Props = {
  userData: any;
  setUserData: React.Dispatch<any>;
  submitClicked: boolean;
  setSubmitClicked: React.Dispatch<React.SetStateAction<boolean>>;
  updateUser: (newUser: any) => void;
  updateCheckoutStep?: (newStep: number) => void;
  onClose?: () => void;
};

const LogInForm = ({
  userData,
  setUserData,
  submitClicked,
  setSubmitClicked,
  updateUser,
}: Props) => {
  const navigate = useNavigate();

  const onChangeUsername = (e: any) => {
    setSubmitClicked(false);
    setUserData({ ...userData, username: e.target.value });
  };

  const onChangePassword = (e: any) => {
    setSubmitClicked(false);
    setUserData({ ...userData, password: e.target.value });
  };

  const onSubmit = () => {
    if (
      userData.username &&
      userData.username !== "" &&
      userData.password &&
      userData.password !== ""
    ) {
      axios
        .post(`${host}/api/auth/login`, userData)
        .then((response) => {
          const token = response?.data.access_token;
          localStorage.setItem("token", token);
          axios
            .get(`${host}/api/auth/profile`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(async (response) => {
              updateUser(response.data);

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
          } else {
            let message: string = error.response.data.message[0];
            showNotification(`${message}`, "error");
          }
        });
    } else {
      setSubmitClicked(true);
    }
  };

  return (
    <FormControl display="flex" flexDirection="column" gap={6} maxW={"600px"}>
      <TextInput
        field="Username"
        onChange={onChangeUsername}
        value={userData?.username || ""}
        isInvalid={
          submitClicked && (!userData.username || userData.username === "")
        }
      />
      <TextInput
        field="Password"
        onChange={onChangePassword}
        value={userData?.password || ""}
        isInvalid={
          submitClicked && (!userData.password || userData.password === "")
        }
        type="password"
      />
      <MyButton onClick={onSubmit}>Submit</MyButton>
    </FormControl>
  );
};

export default LogInForm;
