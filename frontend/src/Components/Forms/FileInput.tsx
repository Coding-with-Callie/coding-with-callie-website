import { Box, FormLabel, Input } from "@chakra-ui/react";

type Props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  key: string;
  label: string;
};

const FileInput = ({ onChange, key, label }: Props) => {
  return (
    <Box>
      <FormLabel layerStyle="text">{label}</FormLabel>
      <Input
        p={0}
        border="none"
        borderRadius="0px"
        type="file"
        accept="image/*"
        onChange={onChange}
        color="#45446A"
        key={key}
        id="image"
      />
    </Box>
  );
};

export default FileInput;
