import { useState } from "react";
import FormInputs from "../Forms/FormInputs";
import { Box, useMediaQuery } from "@chakra-ui/react";
import FormSubmitButton from "../Forms/FormSubmitButton";
import { editableResourceFormData } from "../../helpers/forms";
import { PageType } from "../../Pages/Page";

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
    const input = editableResourceFormData.input.find(
      (item) => item.field === field
    );
    if (input) return [input];
    return [];
  };

  console.log("data", data);

  return (
    <>
      <Box
        mb={6}
        gap={6}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box w="100%">
          <FormInputs
            input={findInput("heading")}
            data={data}
            setData={setData}
            submitClicked={submitClicked}
          />
        </Box>
        <FormSubmitButton
          data={data}
          setData={setData}
          setSubmitClicked={setSubmitClicked}
          input={editableResourceFormData.input}
          axiosType={"admin"}
          route={`/section/${id}`}
          message={"Section updated!"}
          updateData={setPage}
          setEdit={setEdit}
          method="put"
          initialState={initialState}
          resetInitialState={false}
        />
      </Box>
      <Box
        display="flex"
        gap={6}
        mb={6}
        flexDirection={isLargerThan1300 ? "row" : "column"}
      >
        <Box w={isLargerThan1300 ? "75%" : "100%"}>
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
      <Box mb={6}>
        <FormInputs
          input={findInput("linkUrl")}
          data={data}
          setData={setData}
          submitClicked={submitClicked}
        />
      </Box>
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
    </>
  );
};

export default TextWithImageAndLinkForm;
