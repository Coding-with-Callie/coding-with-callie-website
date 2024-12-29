import { Box, FormHelperText, FormLabel, Textarea } from "@chakra-ui/react";
import { makeLowerCase } from "../../helpers/helpers";
import { useEffect, useRef } from "react";

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <Box>
      {label !== "" && <FormLabel>{label}</FormLabel>}
      <Textarea
        variant="filled"
        onChange={onChange}
        value={value}
        isInvalid={isInvalid}
        id={field}
        resize="none" // Disable manual resizing
        ref={textareaRef}
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
