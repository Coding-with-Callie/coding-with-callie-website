import { Heading } from "@chakra-ui/react";

type Props = {
  text: string;
  textAlignCenter: boolean;
};

const BodyHeading = ({ text, textAlignCenter }: Props) => {
  return (
    <Heading
      fontSize={28}
      color="#79A9CD"
      textAlign={textAlignCenter ? "center" : "left"}
    >
      {text}
    </Heading>
  );
};

export default BodyHeading;
