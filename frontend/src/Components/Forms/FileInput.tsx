import { Box, FormLabel, Input } from "@chakra-ui/react";

type Props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  key: string;
};

const FileInput = ({ onChange, key }: Props) => {
  return (
    <Box>
      <FormLabel layerStyle="input">Resource Image</FormLabel>
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
