import { Box, FormLabel, Input, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import MyButton from "../MyButton";

type Props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  key: string;
  label: string;
};

const FileInput = ({ onChange, key, label }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>("No file chosen");

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName(null);
    }
    onChange(event);
  };

  return (
    <Box>
      <FormLabel>{label}</FormLabel>
      <Text>{fileName}</Text>
      <MyButton onClick={handleIconClick}>
        Upload Image
        <Input
          p={0}
          border="none"
          borderRadius="0px"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          color="#45446A"
          key={key}
          id="image"
          display="none"
          ref={fileInputRef}
        />
      </MyButton>
    </Box>
  );
};

export default FileInput;
