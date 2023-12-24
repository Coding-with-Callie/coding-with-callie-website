import { Box, FormLabel, Input } from "@chakra-ui/react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { Context } from "../../App";
import MyButton from "../MyButton";

type Props = {
  field: string;
  fieldValue: string;
  updateFieldValue: (field: string) => void;
};

const EditModal = ({ field, fieldValue, updateFieldValue }: Props) => {
  const context: Context = useOutletContext();
  const userId = context.user.id;

  const handleChange = (e: any) => {
    updateFieldValue(e.target.value);
  };

  const handleSubmit = (field: string) => {
    context.user[field] = fieldValue;
    const token = localStorage.getItem("token");
    axios
      .post(
        `${
          process.env.REACT_APP_API || "http://localhost:3001/api"
        }/auth/change-account-detail`,
        { id: userId, value: fieldValue, field: field },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        context.updateUser(response.data);
      });
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <FormLabel>{field}</FormLabel>
      <Input type="text" variant="filled" onChange={handleChange} />
      <MyButton
        onClick={() => {
          handleSubmit(field);
        }}
      >
        Submit
      </MyButton>
    </Box>
  );
};

export default EditModal;
