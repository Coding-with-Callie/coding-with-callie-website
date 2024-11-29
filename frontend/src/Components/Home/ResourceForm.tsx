import MyButton from "../MyButton";
import { useState } from "react";
import { ResourceType } from "../../Pages/Home";
import { axiosAdmin } from "../../helpers/axios_instances";
import FormContainer from "../Forms/FormContainer";
import FormHeading from "../Forms/FormHeading";
import TextInput from "../Forms/TextInput";
import TextAreaInput from "../Forms/TextAreaInput";
import FileInput from "../Forms/FileInput";
import CheckboxInput from "../Forms/CheckboxInput";
import { showNotification } from "../..";
import { createFormData } from "../../helpers/helpers";
import { useOutletContext } from "react-router-dom";
import { Context } from "../../App";

type Props = {
  setResources: React.Dispatch<React.SetStateAction<ResourceType[]>>;
};

export type ResourceData = {
  heading: string;
  bodyText: string;
  buttonText: string;
  linkUrl: string;
  target: boolean;
  image: File | null;
};

const ResourceForm = ({ setResources }: Props) => {
  const { catchError } = useOutletContext() as Context;

  const [resourceData, setResourceData] = useState<ResourceData>({
    heading: "",
    bodyText: "",
    buttonText: "",
    linkUrl: "",
    target: true,
    image: null,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, checked, files } = e.target;

    setResourceData({
      ...resourceData,
      [id]: files ? files[0] : value || checked,
    });
  };

  const [fileInputKey, setFileInputKey] = useState<string>("");

  const [submitClicked, setSubmitClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setResourceData({
      heading: "",
      bodyText: "",
      buttonText: "",
      linkUrl: "",
      target: true,
      image: null,
    });

    setFileInputKey(new Date().getTime().toString());
    setSubmitClicked(false);
    setLoading(false);
  };

  const onSubmit = () => {
    setSubmitClicked(true);

    if (
      resourceData.heading === "" ||
      resourceData.bodyText === "" ||
      resourceData.buttonText === "" ||
      resourceData.linkUrl === ""
    ) {
      return;
    }

    setLoading(true);

    axiosAdmin
      .post("/resource", createFormData(resourceData))
      .then((response) => {
        setResources(response.data);

        showNotification("Resource created successfully", "success");
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        catchError(error);
      })
      .finally(() => {
        resetState();
      });
  };

  return (
    <FormContainer>
      <FormHeading>Create Resource</FormHeading>
      <TextInput
        label="Title"
        field="heading"
        value={resourceData.heading}
        onChange={onChange}
        isInvalid={submitClicked && resourceData.heading === ""}
      />
      <TextAreaInput
        label="Description"
        field="bodyText"
        onChange={onChange}
        value={resourceData.bodyText}
        isInvalid={submitClicked && resourceData.bodyText === ""}
      />
      <FileInput onChange={onChange} key={fileInputKey} />
      <TextInput
        label="Button Text"
        field="buttonText"
        value={resourceData.buttonText}
        onChange={onChange}
        isInvalid={submitClicked && resourceData.buttonText === ""}
      />
      <TextInput
        label="Resource Link"
        field="linkUrl"
        value={resourceData.linkUrl}
        onChange={onChange}
        isInvalid={submitClicked && resourceData.linkUrl === ""}
      />
      <CheckboxInput
        label="Open Link in New Tab"
        field="target"
        onChange={onChange}
        isChecked={resourceData.target}
      />
      <MyButton onClick={onSubmit} loading={loading}>
        Submit
      </MyButton>
    </FormContainer>
  );
};

export default ResourceForm;
