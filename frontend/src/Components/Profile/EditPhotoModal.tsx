import { Box, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { showNotification } from "../..";
import { Context } from "../../App";
import MyButton from "../MyButton";
import { axiosPrivate } from "../../helpers/axios_instances";

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
    if (photo) {
      const formData = new FormData();
      formData.append("file", photo);
      onClose();
      axiosPrivate
        .post(`/upload-profile-image?id=${context.user.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          showNotification(`Your profile photo has been changed`, "success");
          context.updateUser(response.data);
        })
        .catch((error) => {
          showNotification(error.message, "error");

          if (error.path) {
            navigate(error.path);
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
