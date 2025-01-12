import { useState } from "react";
import FormInputs from "../Forms/FormInputs";
import { Box, useMediaQuery } from "@chakra-ui/react";
import FormSubmitButton from "../Forms/FormSubmitButton";
import { editableResourceFormData } from "../../helpers/forms";
import { PageType } from "../../Pages/Page";
import ContentForm from "./ContentForm";

type Props = {
  id: number;
  initialState: any;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const TextWithImageForm = ({ id, initialState, setPage, setEdit }: Props) => {
  const [data, setData] = useState(initialState);
  const [submitClicked, setSubmitClicked] = useState(false);

  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");
  const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");

  const findInput = (field: string) => {
    const input = editableResourceFormData.input.find(
      (item) => item.field === field
    );
    if (input) return [input];
    return [];
  };

  return (
    <ContentForm
      id={id}
      data={data}
      setData={setData}
      setSubmitClicked={setSubmitClicked}
      input={editableResourceFormData.input}
      setPage={setPage}
      setEdit={setEdit}
      initialState={initialState}
    >
      <Box
        flex={1}
        display="flex"
        gap={6}
        flexDirection={isLargerThan1300 ? "row" : "column"}
      >
        <Box w={isLargerThan500 ? "350px" : "250px"}>
          <FormInputs
            input={findInput("image")}
            data={data}
            setData={setData}
            submitClicked={submitClicked}
          />
        </Box>
        <Box display="flex" flexDirection="column" gap={6} flex={1}>
          <FormInputs
            input={findInput("heading")}
            data={data}
            setData={setData}
            submitClicked={submitClicked}
          />
          <FormInputs
            input={findInput("bodyText")}
            data={data}
            setData={setData}
            submitClicked={submitClicked}
          />
        </Box>
      </Box>
    </ContentForm>
  );
};

export default TextWithImageForm;
