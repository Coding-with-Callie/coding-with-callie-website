import { useState } from "react";
import CustomForm from "../Forms/CustomForm";
import { changePasswordFormData } from "../../helpers/forms";

const EditPassword = () => {
  const initialState = {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [data, setData] = useState(initialState);

  return (
    <CustomForm
      form={changePasswordFormData}
      initialState={initialState}
      data={data}
      setData={setData}
      axiosType={"private"}
      route={"change-password"}
      message={"Password changed!"}
    />
  );
};

export default EditPassword;
