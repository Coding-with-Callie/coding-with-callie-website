import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { Context } from "../../App";
import { loginFormData } from "../../helpers/forms";
import CustomForm from "../Forms/CustomForm";

type UserData = {
  username: string;
  password: string;
  [key: string]: string;
};

const LogInForm = () => {
  const initialState = {
    username: "",
    password: "",
  } as UserData;
  const [userData, setUserData] = useState<UserData>(initialState);

  const { updateUser } = useOutletContext() as Context;

  return (
    <CustomForm
      form={loginFormData}
      initialState={initialState}
      data={userData}
      setData={setUserData}
      axiosType="public"
      route="/login"
      updateData={updateUser}
      message={`Welcome back, ${userData.username}!`}
    />
  );
};

export default LogInForm;
