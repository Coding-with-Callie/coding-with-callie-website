import { useState } from "react";
import { ResourceType } from "../../Pages/Home";
import { axiosAdmin } from "../../helpers/axios_instances";
import { showNotification } from "../..";
import { createFormData } from "../../helpers/helpers";
import { useOutletContext } from "react-router-dom";
import { Context } from "../../App";
import CustomForm from "../Forms/CustomForm";
import { resourceFormData } from "../../helpers/forms";

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

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { id, value, checked, files } = e.target;

  //   setResourceData({
  //     ...resourceData,
  //     [id]: files ? files[0] : value || checked,
  //   });
  // };

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
    <CustomForm
      form={resourceFormData}
      data={resourceData}
      setData={setResourceData}
      submitClicked={submitClicked}
      fileInputKey={fileInputKey}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};

export default ResourceForm;
