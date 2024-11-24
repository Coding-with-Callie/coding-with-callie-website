import { Box, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { showNotification } from "../..";
import { Context } from "../../App";
import MyButton from "../MyButton";
import { axiosPrivate } from "../../helpers/axios_instances";

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
  const [match, setMatch] = useState("");

  const handleChange = (e: any) => {
    setNewValue(e.target.value);
  };

  const handleChangeMatch = (e: any) => {
    setMatch(e.target.value);
  };

  const handleSubmit = (field: string) => {
    if (field === "password") {
      if (newValue !== match) {
        setSubmitClicked(true);
        return;
      }
    }
    if (newValue !== "" && newValue) {
      axiosPrivate
        .post("/change-account-detail", {
          id: userId,
          value: newValue,
          field: field,
        })
        .then((response) => {
          showNotification(`Your account ${field} has been changed`, "success");
          context.updateUser(response.data);
        })
        .catch((error) => {
          showNotification(error.message, "error");
          if (error.path) {
            navigate(error.path);
          }
        });
      onClose();
    } else {
      setSubmitClicked(true);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={4} mx={10} mb={10} mt={4}>
      <Input
        type={field === "password" ? "password" : "text"}
        variant="filled"
        layerStyle="input"
        placeholder={field === "password" ? "Enter new password" : ""}
        onChange={handleChange}
        isInvalid={submitClicked && newValue === ""}
      />
      {field === "password" ? (
        <Input
          type="password"
          variant="filled"
          layerStyle="input"
          placeholder="Retype new password"
          onChange={handleChangeMatch}
          isInvalid={submitClicked && match === ""}
        />
      ) : null}
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
