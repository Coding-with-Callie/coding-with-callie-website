import { CustomFormData } from "../../helpers/forms";
import FormContainer from "./FormContainer";
import FormHeading from "./FormHeading";
import FormInputs from "./FormInputs";
import { useState } from "react";
import FormSubmitButton from "./FormSubmitButton";

type Props = {
  form: CustomFormData;
  initialState: { [key: string]: any };
  data: { [key: string]: any };
  setData: React.Dispatch<React.SetStateAction<any>>;
  fileInputKey?: string;
  setFileInputKey?: React.Dispatch<React.SetStateAction<string>>;
  axiosType: "public" | "private" | "admin";
  route: string;
  updateData?: React.Dispatch<React.SetStateAction<any>>;
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

  return (
    <FormContainer>
      <FormHeading>{form.formHeading}</FormHeading>
      <FormInputs
        input={form.input}
        data={data}
        setData={setData}
        fileInputKey={fileInputKey}
        submitClicked={submitClicked}
      />
      <FormSubmitButton
        data={data}
        setData={setData}
        initialState={initialState}
        setSubmitClicked={setSubmitClicked}
        input={form.input}
        axiosType={axiosType}
        route={route}
        message={message}
      />
    </FormContainer>
  );
};

export default CustomForm;
