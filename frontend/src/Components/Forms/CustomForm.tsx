import { CustomFormData } from "../../helpers/forms";
import MyButton from "../MyButton";
import CheckboxInput from "./CheckboxInput";
import FileInput from "./FileInput";
import FormContainer from "./FormContainer";
import FormHeading from "./FormHeading";
import TextAreaInput from "./TextAreaInput";
import TextInput from "./TextInput";

type Props = {
  form: CustomFormData;
  data: { [key: string]: any };
  setData: React.Dispatch<React.SetStateAction<any>>;
  submitClicked: boolean;
  fileInputKey?: string;
  onSubmit: () => void;
  loading: boolean;
};

const CustomForm = ({
  form,
  data,
  setData,
  submitClicked,
  fileInputKey,
  onSubmit,
  loading,
}: Props) => {
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
