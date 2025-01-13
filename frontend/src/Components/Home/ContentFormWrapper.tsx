import { Box, useMediaQuery } from "@chakra-ui/react";
import { FieldData } from "../../helpers/forms";
import FormSubmitButton from "../Forms/FormSubmitButton";

type Props = {
  children: React.ReactNode;
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  setSubmitClicked: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  setPage: React.Dispatch<React.SetStateAction<any>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  initialState: any;
  input: FieldData[];
};

const ContentForm = ({
  children,
  data,
  setData,
  setSubmitClicked,
  id,
  setPage,
  setEdit,
  initialState,
  input,
}: Props) => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <Box
      display="flex"
      gap={6}
      flexDirection={isLargerThan800 ? "row" : "column"}
    >
      {children}
      <FormSubmitButton
        data={data}
        setData={setData}
        setSubmitClicked={setSubmitClicked}
        input={input}
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
  );
};

export default ContentForm;
