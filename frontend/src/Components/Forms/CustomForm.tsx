import { useState } from "react";
import { CustomFormData } from "../../helpers/forms";
import MyButton from "../MyButton";
import CheckboxInput from "./CheckboxInput";
import FileInput from "./FileInput";
import FormContainer from "./FormContainer";
import FormHeading from "./FormHeading";
import TextAreaInput from "./TextAreaInput";
import TextInput from "./TextInput";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../../App";
import {
  axiosAdmin,
  axiosPrivate,
  axiosPublic,
} from "../../helpers/axios_instances";
import { showNotification } from "../..";
import { createFormData, isInvalidEmail } from "../../helpers/helpers";

type Props = {
  form: CustomFormData;
  initialState: { [key: string]: any };
  data: { [key: string]: any };
  setData: React.Dispatch<React.SetStateAction<any>>;
  fileInputKey?: string;
  setFileInputKey?: React.Dispatch<React.SetStateAction<string>>;
  axiosType: "public" | "private" | "admin";
  route: string;
  updateData: React.Dispatch<React.SetStateAction<any>>;
  message: string;
};

const CustomForm = ({
  form,
  initialState,
  data,
  setData,
  fileInputKey,
  setFileInputKey,
  axiosType,
  route,
  updateData,
  message,
}: Props) => {
  const [submitClicked, setSubmitClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const { catchError } = useOutletContext() as Context;

  const navigate = useNavigate();

  const resetState = () => {
    setData(initialState);

    if (setFileInputKey) setFileInputKey(new Date().getTime().toString());

    setSubmitClicked(false);
    setLoading(false);
  };

  const doNotSubmitForm = () => {
    let invalidInput = false;

    for (const key in data) {
      const item = form.input.find((item) => item.field === key);
      if (!item) continue;

      invalidInput = isInvalid(key, data[key], item.required);

      if (invalidInput) break;
    }

    return invalidInput;
  };

  const onSubmit = () => {
    setSubmitClicked(true);

    if (doNotSubmitForm()) return;

    setLoading(true);

    const axiosToUse =
      axiosType === "public"
        ? axiosPublic
        : axiosType === "private"
          ? axiosPrivate
          : axiosAdmin;

    let dataToSend = data;

    if (route === "/resource" || route === "/signup") {
      dataToSend = createFormData(data);
    }

    axiosToUse
      .post(route, dataToSend)
      .then((response) => {
        updateData(response.data);

        showNotification(message, "success");
        if (route === "/login" || route === "/signup") {
          navigate("/");
        }
        if (route === "/resource") {
          window.scrollTo(0, 0);
        }
      })
      .catch((error) => {
        catchError(error);
      })
      .finally(() => {
        resetState();
      });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, checked, files } = e.target;

    setData({
      ...data,
      [id]: files ? files[0] : id === "target" ? checked : value,
    });
  };

  const isInvalid = (field: string, value: string, required: boolean) => {
    // If the field is required and the value is empty, show an error
    if (value === "" && required) return true;

    // If the field is an email and the value is not a valid email, show an error
    if (field === "email" && isInvalidEmail(value)) return true;

    return false;
  };

  return (
    <FormContainer>
      <FormHeading>{form.formHeading}</FormHeading>
      {form.input.map((item, index) => {
        if (item.type === "text") {
          return (
            <TextInput
              key={index}
              label={item.label}
              field={item.field}
              value={data[item.field]}
              onChange={onChange}
              isInvalid={
                submitClicked &&
                isInvalid(item.field, data[item.field], item.required)
              }
            />
          );
        }

        if (item.type === "password") {
          return (
            <TextInput
              key={index}
              label={item.label}
              field={item.field}
              value={data[item.field]}
              onChange={onChange}
              isInvalid={
                submitClicked &&
                isInvalid(item.field, data[item.field], item.required)
              }
              type="password"
            />
          );
        }

        if (item.type === "textarea") {
          return (
            <TextAreaInput
              label={item.label}
              field={item.field}
              onChange={onChange}
              value={data[item.field]}
              isInvalid={
                submitClicked &&
                isInvalid(item.field, data[item.field], item.required)
              }
            />
          );
        }

        if (item.type === "file") {
          return (
            <FileInput
              key={fileInputKey || ""}
              onChange={onChange}
              label={item.label}
            />
          );
        }

        if (item.type === "checkbox") {
          return (
            <CheckboxInput
              label={item.label}
              field={item.field}
              isChecked={data[item.field]}
              onChange={onChange}
            />
          );
        }
        return null;
      })}
      <MyButton onClick={onSubmit} loading={loading}>
        Submit
      </MyButton>
    </FormContainer>
  );
};

export default CustomForm;
