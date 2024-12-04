import { EditIcon } from "@chakra-ui/icons";
import { Box, FormControl, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import FormInputs from "../Forms/FormInputs";
import FormSubmitButton from "../Forms/FormSubmitButton";
import { useOutletContext } from "react-router-dom";
import { Context } from "../../App";

type Props = {
  field: string;
  value: string;
};

const EditableText = ({ field, value }: Props) => {
  const { updateUser } = useOutletContext() as Context;

  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({ [field.toLowerCase()]: value });
  const [submitClicked, setSubmitClicked] = useState(false);

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
      <Text layerStyle="text">{field}: </Text>
      <Box display="flex" w="70%" alignItems="center">
        {edit ? (
          <FormControl flex={1} mr={2}>
            <FormInputs
              input={input}
              data={data}
              setData={setData}
              submitClicked={submitClicked}
            />
          </FormControl>
        ) : (
          <Text layerStyle="text" flex={1}>
            {value}
          </Text>
        )}
        {edit ? (
          <FormSubmitButton
            data={data}
            setData={setData}
            setSubmitClicked={setSubmitClicked}
            input={input}
            axiosType={"private"}
            route={"/change-account-detail"}
            message={"Account details updated!"}
            setEdit={setEdit}
            updateData={updateUser}
          />
        ) : (
          <IconButton
            colorScheme="green"
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
