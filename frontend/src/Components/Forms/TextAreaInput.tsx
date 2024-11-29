import { Box, FormLabel, Textarea } from "@chakra-ui/react";

type Props = {
  label: string;
  field?: string;
  onChange: any;
  value: string;
  isInvalid?: boolean;
};

const TextAreaInput = ({
  label,
  field,
  onChange,
  value,
  isInvalid = false,
}: Props) => {
  return (
    <Box>
      <FormLabel layerStyle="input">{label}</FormLabel>
      <Textarea
        layerStyle="input"
        variant="filled"
        onChange={onChange}
        value={value}
        isInvalid={isInvalid}
        id={field}
      />
    </Box>
  );
};

export default TextAreaInput;
