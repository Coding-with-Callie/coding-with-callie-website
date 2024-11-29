import { showNotification } from "../..";
import { useNavigate, useOutletContext } from "react-router-dom";
import { axiosPublic } from "../../helpers/axios_instances";
import { useState } from "react";
import { Context } from "../../App";
import { loginFormData } from "../../helpers/resourceFormData";
import CustomForm from "../Forms/CustomForm";

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
  const [loading, setLoading] = useState(false);

  const { updateUser, catchError } = useOutletContext() as Context;

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setUserData({
      ...userData,
      [id]: value,
    });
  };

  const resetState = () => {
    setUserData({ username: "", password: "" });
    setSubmitClicked(false);
    setLoading(false);
  };

  const onSubmit = () => {
    if (userData.username === "" || userData.password === "") {
      setSubmitClicked(true);
      return;
    }

    setLoading(true);

    axiosPublic
      .post("/login", userData)
      .then((response) => {
        updateUser(response.data);

        showNotification(`Welcome back, ${response.data.username}!`, "success");
        navigate("/");
      })
      .catch((error) => {
        resetState();
        catchError(error);
      });
  };

  return (
    <CustomForm
      form={loginFormData}
      data={userData}
      onChange={onChange}
      submitClicked={submitClicked}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};

export default LogInForm;
