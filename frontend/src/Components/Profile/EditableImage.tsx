import { EditIcon } from "@chakra-ui/icons";
import { Box, Image, IconButton, Input } from "@chakra-ui/react";
import { useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { Context } from "../../App";
import { axiosPrivate } from "../../helpers/axios_instances";

type Props = {
  photo: string;
};

const EditableImage = ({ photo }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { updateUser } = useOutletContext() as Context;

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
    }
  };

  const onChange = (e: any) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    axiosPrivate.post("/upload-profile-image", formData).then((response) => {
      updateUser(response.data);
    });
  };

  return (
    <Box display="flex">
      <Image
        src={photo}
        border="1px solid #A9A9A9"
        borderRadius="50%"
        h={"250px"}
        boxShadow="lg"
        w={"250px"}
      />
      <IconButton
        aria-label="edit"
        icon={<EditIcon />}
        onClick={handleIconClick}
      />
      <Input
        ref={fileInputRef}
        p={0}
        border="none"
        borderRadius="0px"
        type="file"
        accept="image/*"
        onChange={onChange}
        color="#45446A"
        id="image"
        display="none"
      />
    </Box>
  );
};

export default EditableImage;
