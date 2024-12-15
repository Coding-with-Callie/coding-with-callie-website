import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Context } from "vm";
import { showNotification } from "../..";
import {
  axiosPublic,
  axiosPrivate,
  axiosAdmin,
} from "../../helpers/axios_instances";
import { createFormData, isInvalid } from "../../helpers/helpers";
import MyButton from "../MyButton";
import { FieldData } from "../../helpers/forms";
import { IconButton, Spinner } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

type Props = {
  data: { [key: string]: any };
  setData: React.Dispatch<React.SetStateAction<any>>;
  initialState: { [key: string]: any };
  setFileInputKey?: React.Dispatch<React.SetStateAction<string>>;
  setSubmitClicked: React.Dispatch<React.SetStateAction<boolean>>;
  input: FieldData[];
  axiosType: "public" | "private" | "admin";
  route: string;
  updateData?: React.Dispatch<React.SetStateAction<any>>;
  message: string;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  method?: "post" | "put";
  resetInitialState?: boolean;
};

const FormSubmitButton = ({
  data,
  setData,
  initialState,
  setFileInputKey,
  setSubmitClicked,
  input,
  axiosType,
  route,
  updateData,
  message,
  setEdit,
  method = "post",
  resetInitialState = true,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { catchError } = useOutletContext() as Context;
  const navigate = useNavigate();

  const resetState = () => {
    if (resetInitialState) setData(initialState);
    if (setEdit) setEdit(false);

    if (setFileInputKey) setFileInputKey(new Date().getTime().toString());

    setSubmitClicked(false);
    setLoading(false);
  };

  const doNotSubmitForm = () => {
    // Check if form is unchanged
    if (JSON.stringify(data) === JSON.stringify(initialState)) {
      if (setEdit) setEdit(false);
      return true;
    }

    let invalidInput = false;

    // Check if any required fields are invalid
    for (const key in data) {
      const item = input.find((item) => item.field === key);
      if (!item) continue;

      if (key === "newPassword" && data[key] !== data["confirmPassword"]) {
        invalidInput = true;
        break;
      }

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

    if (
      route.includes("/resource") ||
      route === "/signup" ||
      route === "/speaker"
    ) {
      dataToSend = createFormData(data);
    }

    const methodToUse = method === "post" ? "post" : "put";

    axiosToUse[methodToUse](route, dataToSend)
      .then((response) => {
        if (updateData) updateData(response.data);

        showNotification(message, "success");
        if (route === "/login" || route === "/signup" || route === "/contact") {
          navigate("/");
        }
        if (route === "/resource" || route === "/speaker") {
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

  if (!resetInitialState) {
    return (
      <IconButton
        aria-label="submit"
        icon={loading ? <Spinner /> : <CheckIcon />}
        onClick={onSubmit}
      />
    );
  } else {
    return (
      <MyButton onClick={onSubmit} loading={loading}>
        Submit
      </MyButton>
    );
  }
};

export default FormSubmitButton;
