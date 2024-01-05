import { Box, Input } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { showNotification } from "../..";
import { Context } from "../../App";
import MyButton from "../MyButton";

type Props = {
  onClose: () => void;
};

const EditPhotoModal = ({ onClose }: Props) => {
  const context: Context = useOutletContext();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState();

  const handlePhotoChange = (e: any) => {
    setPhoto(e.target.files[0]);
  };

  const onFileUpload = () => {
    const token = localStorage.getItem("token");

    if (photo) {
      const formData = new FormData();
      formData.append("file", photo);
      onClose();
      axios
        .post(
          `${
            process.env.REACT_APP_API || "http://localhost:3001/api"
          }/auth/upload?id=${context.user.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          showNotification(`Your profile photo has been changed`, "success");
          context.updateUser(response.data);
        })
        .catch((error) => {
          if (error.response.data.message === "Unauthorized") {
            showNotification(
              "It looks like your session has expired. Please log in again to view Coding with Callie resources!",
              "error"
            );
            navigate("/log-in");
          } else {
            let message: string = error.response.data.message[0];
            showNotification(`${message}`, "error");
          }
        });
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={4} mx={10} mb={10} mt={4}>
      <Input
        p={0}
        border="none"
        borderRadius="0px"
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
      />
      <MyButton onClick={onFileUpload}>Submit</MyButton>
    </Box>
  );
};

export default EditPhotoModal;
