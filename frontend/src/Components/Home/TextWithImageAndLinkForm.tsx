import { useState } from "react";
import FormInputs from "../Forms/FormInputs";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { textWithImageAndLinkFormData } from "../../helpers/forms";
import { PageType } from "../../Pages/Page";
import ContentForm from "./ContentFormWrapper";

type Props = {
  id: number;
  initialState: any;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const TextWithImageAndLinkForm = ({
  id,
  initialState,
  setPage,
  setEdit,
}: Props) => {
  const [data, setData] = useState(initialState);
  const [submitClicked, setSubmitClicked] = useState(false);

  const [isLargerThan1300] = useMediaQuery("(min-width: 1300px)");

  const findInput = (field: string) => {
    const input = textWithImageAndLinkFormData.input.find(
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
      input={textWithImageAndLinkFormData.input}
      setPage={setPage}
      setEdit={setEdit}
      initialState={initialState}
    >
      <Box display="flex" flexDirection="column" gap={6} w="100%">
        <FormInputs
          input={findInput("heading")}
          data={data}
          setData={setData}
          submitClicked={submitClicked}
        />
        <Box
          display="flex"
          gap={6}
          flexDirection={isLargerThan1300 ? "row" : "column"}
        >
          <Box w={isLargerThan1300 ? "50%" : "100%"}>
            <FormInputs
              input={findInput("bodyText")}
              data={data}
              setData={setData}
              submitClicked={submitClicked}
            />
          </Box>
          <FormInputs
            input={findInput("image")}
            data={data}
            setData={setData}
            submitClicked={submitClicked}
          />
        </Box>
        <FormInputs
          input={findInput("linkUrl")}
          data={data}
          setData={setData}
          submitClicked={submitClicked}
        />
        <Box display="flex" alignItems="center" gap={6}>
          <Box flex={1}>
            <FormInputs
              input={findInput("buttonText")}
              data={data}
              setData={setData}
              submitClicked={submitClicked}
            />
          </Box>
          <FormInputs
            input={findInput("target")}
            data={data}
            setData={setData}
            submitClicked={submitClicked}
          />
        </Box>
      </Box>
    </ContentForm>
  );
};

export default TextWithImageAndLinkForm;
