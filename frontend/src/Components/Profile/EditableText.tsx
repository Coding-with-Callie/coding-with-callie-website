import { Box, FormControl, Text, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import FormInputs from "../Forms/FormInputs";
import FormSubmitButton from "../Forms/FormSubmitButton";
import { useOutletContext } from "react-router-dom";
import { Context } from "../../App";
import BodyHeading from "../BodyHeading";

type Props = {
  inputType?: string;
  field: string;
  value: string;
  route?: string;
  method?: "post" | "patch";
  updateData?: (newData: any) => void;
  isHeading?: boolean;
  showLabel?: boolean;
  initialState?: { [key: string]: any };
  message?: string;
};

const EditableText = ({
  inputType = "text",
  field,
  value,
  route = "/change-account-detail",
  method = "post",
  updateData,
  isHeading = false,
  showLabel = true,
  initialState,
  message = "Account details updated!",
}: Props) => {
  const { updateUser } = useOutletContext() as Context;
  initialState = { ...initialState, [field.toLowerCase()]: value };

  const [edit, setEdit] = useState(false);
  const [data, setData] = useState(initialState);
  const [submitClicked, setSubmitClicked] = useState(false);

  const [isLargerThan750] = useMediaQuery("(min-width: 750px)");

  const input = [
    {
      type: inputType || "text",
      label: "",
      field: field.toLowerCase(),
      required: inputType === "textarea" ? false : true,
    },
  ];

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      mb={2}
      alignItems="center"
    >
      {isLargerThan750 && showLabel && <Text>{field}: </Text>}
      <Box
        display="flex"
        w={isLargerThan750 && showLabel ? "70%" : "100%"}
        alignItems={inputType === "textarea" ? "top" : "center"}
      >
        {edit ? (
          <FormControl flex={1} mr={2}>
            <FormInputs
              input={input}
              data={data}
              setData={setData}
              submitClicked={submitClicked}
            />
          </FormControl>
        ) : isHeading ? (
          <Box
            flex={1}
            onClick={() => {
              setEdit(!edit);
            }}
            _hover={{ cursor: "pointer" }}
            w="fit-content"
          >
            <BodyHeading>{value}</BodyHeading>
          </Box>
        ) : (
          <Text
            flex={1}
            onClick={() => {
              setEdit(!edit);
            }}
            _hover={{ cursor: "pointer" }}
            lineHeight="40px"
          >
            {value}
          </Text>
        )}
        {edit && (
          <FormSubmitButton
            data={data}
            setData={setData}
            setSubmitClicked={setSubmitClicked}
            input={input}
            axiosType={"private"}
            method={method}
            route={route}
            message={message}
            setEdit={setEdit}
            updateData={updateData || updateUser}
            initialState={initialState}
            resetInitialState={false}
          />
        )}
      </Box>
    </Box>
  );
};

export default EditableText;
