import { Box, FormLabel, Textarea } from "@chakra-ui/react";

type Props = {
  field: string;
  onChange: any;
  value: string;
  isInvalid: boolean | undefined;
};

const TextAreaInput = ({ field, onChange, value, isInvalid }: Props) => {
  return (
    <Box>
      <FormLabel layerStyle="input">{field}</FormLabel>
      <Textarea
        layerStyle="input"
        variant="filled"
        onChange={onChange}
        value={value}
        isInvalid={isInvalid}
      />
    </Box>
  );
};

export default TextAreaInput;
