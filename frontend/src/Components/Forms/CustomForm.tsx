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
import { createFormData } from "../../helpers/helpers";
import { ResourceData } from "../Home/CreateResourceForm";

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

  const onSubmit = () => {
    for (const key in data) {
      if (data[key] === "") {
        setSubmitClicked(true);
        return;
      }
    }

    setLoading(true);

    const axiosToUse =
      axiosType === "public"
        ? axiosPublic
        : axiosType === "private"
          ? axiosPrivate
          : axiosAdmin;

    let dataToSend = data;

    if (route === "/resource") {
      dataToSend = createFormData(data as ResourceData);
    }

    axiosToUse
      .post(route, dataToSend)
      .then((response) => {
        updateData(response.data);

        showNotification(message, "success");
        if (route === "/login") {
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
      [id]: files ? files[0] : value || checked,
    });
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
              isInvalid={submitClicked && data[item.field] === ""}
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
              isInvalid={submitClicked && data[item.field] === ""}
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
              isInvalid={submitClicked && data[item.field] === ""}
            />
          );
        }

        if (item.type === "file") {
          return <FileInput key={fileInputKey || ""} onChange={onChange} />;
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
