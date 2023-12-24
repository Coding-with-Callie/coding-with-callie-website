import { Box, Input } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { showNotification } from "../..";
import { Context } from "../../App";
import MyButton from "../MyButton";

type Props = {
  field: string;
  onClose: () => void;
};

const EditModal = ({ field, onClose }: Props) => {
  const context: Context = useOutletContext();
  const userId = context.user.id;
  const navigate = useNavigate();

  const [newValue, setNewValue] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleChange = (e: any) => {
    setNewValue(e.target.value);
  };

  const handleSubmit = (field: string) => {
    if (newValue !== "" && newValue) {
      context.user[field] = newValue;
      const token = localStorage.getItem("token");
      axios
        .post(
          `${
            process.env.REACT_APP_API || "http://localhost:3001/api"
          }/auth/change-account-detail`,
          { id: userId, value: newValue, field: field },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          context.updateUser(response.data);
        })
        .catch((error) => {
          showNotification(
            "It looks like your session has expired. Please log in again to view Coding with Callie resources!",
            "error"
          );
          navigate("/log-in");
        });
      onClose();
    } else {
      setSubmitClicked(true);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={4} mx={10} mb={10} mt={4}>
      <Input
        type="text"
        variant="filled"
        layerStyle="input"
        onChange={handleChange}
        isInvalid={submitClicked && newValue === ""}
      />
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
