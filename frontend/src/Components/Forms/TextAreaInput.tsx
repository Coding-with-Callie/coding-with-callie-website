import { Box, FormHelperText, FormLabel, Textarea } from "@chakra-ui/react";
import { makeLowerCase } from "../../helpers/helpers";

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
      <FormLabel layerStyle="text">{label}</FormLabel>
      <Textarea
        layerStyle="input"
        variant="filled"
        onChange={onChange}
        value={value}
        isInvalid={isInvalid}
        id={field}
      />
      {isInvalid && (
        <FormHelperText color="red.500">
          Please enter a valid {makeLowerCase(label)}!
        </FormHelperText>
      )}
    </Box>
  );
};

export default TextAreaInput;
