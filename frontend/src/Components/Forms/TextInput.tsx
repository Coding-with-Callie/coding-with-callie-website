import { Box, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { makeLowerCase } from "../../helpers/helpers";

type Props = {
  label: string;
  field: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  value: string;
  isInvalid: boolean | undefined;
  type?: string;
};

const TextInput = ({
  label,
  field,
  onChange,
  value,
  isInvalid,
  type = "text",
}: Props) => {
  return (
    <Box>
      {label !== "" && <FormLabel layerStyle="input">{label}</FormLabel>}
      <Input
        type={type}
        layerStyle="input"
        variant="filled"
        id={field}
        onChange={onChange}
        value={value}
        isInvalid={isInvalid}
      />
      {isInvalid && (
        <FormHelperText color="red.500">
          {field === "confirmPassword"
            ? "New passwords must match!"
            : `Please enter a valid ${makeLowerCase(label)}!`}
        </FormHelperText>
      )}
    </Box>
  );
};

export default TextInput;
