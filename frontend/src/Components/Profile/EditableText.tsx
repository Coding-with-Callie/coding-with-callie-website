import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  IconButton,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";
import FormInputs from "../Forms/FormInputs";
import FormSubmitButton from "../Forms/FormSubmitButton";
import { useOutletContext } from "react-router-dom";
import { Context } from "../../App";
import BodyHeading from "../BodyHeading";

type Props = {
  field: string;
  value: string;
  route?: string;
  method?: "post" | "patch";
  updateData?: (newData: any) => void;
  isHeading?: boolean;
  showLabel?: boolean;
  initialState?: { [key: string]: any };
};

const EditableText = ({
  field,
  value,
  route = "/change-account-detail",
  method = "post",
  updateData,
  isHeading = false,
  showLabel = true,
  initialState,
}: Props) => {
  const { updateUser } = useOutletContext() as Context;
  if (!initialState) initialState = { [field.toLowerCase()]: value };

  const [edit, setEdit] = useState(false);
  const [data, setData] = useState(initialState);
  const [submitClicked, setSubmitClicked] = useState(false);

  const [isLargerThan750] = useMediaQuery("(min-width: 750px)");

  const input = [
    {
      type: "text",
      label: "",
      field: field.toLowerCase(),
      required: true,
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
        alignItems="center"
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
          <Box flex={1}>
            <BodyHeading>{value}</BodyHeading>
          </Box>
        ) : (
          <Text flex={1}>{value}</Text>
        )}
        {edit ? (
          <FormSubmitButton
            data={data}
            setData={setData}
            setSubmitClicked={setSubmitClicked}
            input={input}
            axiosType={"private"}
            method={method}
            route={route}
            message={"Account details updated!"}
            setEdit={setEdit}
            updateData={updateData || updateUser}
            initialState={initialState}
            resetInitialState={false}
          />
        ) : (
          <IconButton
            aria-label="edit"
            icon={<EditIcon />}
            onClick={() => {
              setEdit(!edit);
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default EditableText;
