import { FieldData } from "../../helpers/forms";
import { isInvalid } from "../../helpers/helpers";
import CheckboxInput from "./CheckboxInput";
import DateInput from "./DateInput";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import TextAreaInput from "./TextAreaInput";
import TextInput from "./TextInput";

type Props = {
  input: FieldData[];
  data: { [key: string]: any };
  setData: React.Dispatch<React.SetStateAction<any>>;
  fileInputKey?: string;
  submitClicked: boolean;
};

const FormInputs = ({
  input,
  data,
  setData,
  fileInputKey,
  submitClicked,
}: Props) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, checked, files } = e.target;

    setData({
      ...data,
      [id]: files ? files[0] : id === "target" ? checked : value,
    });
  };

  return (
    <>
      {input.map((item, index) => {
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

        if (item.type === "date") {
          return (
            <DateInput
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

        if (item.type === "rating") {
          return (
            <RatingInput
              data={data}
              setData={setData}
              isInvalid={
                submitClicked &&
                isInvalid(item.field, data[item.field], item.required)
              }
            />
          );
        }
        return null;
      })}
    </>
  );
};

export default FormInputs;
