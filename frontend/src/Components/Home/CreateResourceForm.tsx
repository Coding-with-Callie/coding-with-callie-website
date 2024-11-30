import { useState } from "react";
import { ResourceType } from "../../Pages/Home";
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
  const initialState = {
    heading: "",
    bodyText: "",
    buttonText: "",
    linkUrl: "",
    target: true,
    image: null,
  } as ResourceData;
  const [resourceData, setResourceData] = useState<ResourceData>(initialState);

  const [fileInputKey, setFileInputKey] = useState<string>("");

  return (
    <CustomForm
      form={resourceFormData}
      initialState={initialState}
      data={resourceData}
      setData={setResourceData}
      fileInputKey={fileInputKey}
      setFileInputKey={setFileInputKey}
      axiosType="admin"
      route="/resource"
      updateData={setResources}
      message="Resource created successfully"
    />
  );
};

export default ResourceForm;
