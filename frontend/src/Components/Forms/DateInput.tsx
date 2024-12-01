import { Box, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { makeLowerCase } from "../../helpers/helpers";

type Props = {
  label: string;
  field: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isInvalid: boolean;
};

const DateInput = ({ label, field, value, onChange, isInvalid }: Props) => {
  return (
    <Box>
      <FormLabel layerStyle="input">{label}</FormLabel>
      <Input
        type="date"
        layerStyle="input"
        variant="filled"
        value={value}
        id={field}
        onChange={onChange}
        isInvalid={isInvalid}
      />
      {isInvalid && (
        <FormHelperText color="red.500">
          Please enter a valid {makeLowerCase(label)}!
        </FormHelperText>
      )}
    </Box>
  );
};

export default DateInput;
