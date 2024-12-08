import { Box, Checkbox } from "@chakra-ui/react";

type Props = {
  label: string;
  field: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
};

const CheckboxInput = ({ label, field, onChange, isChecked }: Props) => {
  return (
    <Box>
      <Checkbox
        onChange={onChange}
        isChecked={isChecked}
        id={field}
        layerStyle="text"
      >
        {label}
      </Checkbox>
    </Box>
  );
};

export default CheckboxInput;
