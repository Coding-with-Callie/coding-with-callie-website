import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Context } from "../../App";
import CustomForm from "../Forms/CustomForm";
import { signUpFormData } from "../../helpers/forms";

export type UserData = {
  name: string;
  email: string;
  username: string;
  password: string;
  image: File | null;
};

const SignUpForm = () => {
  const initialState = {
    name: "",
    email: "",
    username: "",
    password: "",
    image: null,
  } as UserData;
  const [userData, setUserData] = useState<UserData>(initialState);

  const { updateUser } = useOutletContext() as Context;

  return (
    <CustomForm
      form={signUpFormData}
      initialState={initialState}
      data={userData}
      setData={setUserData}
      axiosType="public"
      route="/signup"
      updateData={updateUser}
      message={`Welcome to Coding with Callie, ${userData.username}!`}
    />
  );
};

export default SignUpForm;
