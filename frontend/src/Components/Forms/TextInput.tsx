import { Box, FormHelperText, FormLabel, Input } from "@chakra-ui/react";

type Props = {
  field: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  value: string;
  isInvalid: boolean | undefined;
  helperText?: string;
  type?: string;
};

const TextInput = ({
  field,
  onChange,
  value,
  isInvalid,
  helperText,
  type,
}: Props) => {
  return (
    <Box>
      <FormLabel layerStyle="input">{field}</FormLabel>
      <Input
        type={type || "text"}
        layerStyle="input"
        variant="filled"
        onChange={onChange}
        value={value}
        isInvalid={isInvalid}
      />
      {helperText ? (
        isInvalid ? (
          <FormHelperText color="red.500">
            Please enter a valid {field.toLowerCase()}!
          </FormHelperText>
        ) : (
          <FormHelperText>{helperText}</FormHelperText>
        )
      ) : null}
    </Box>
  );
};

export default TextInput;
