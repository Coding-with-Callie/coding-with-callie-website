import { Heading } from "@chakra-ui/react";

type Props = {
  children: string;
  textAlignCenter: boolean;
};

const BodyHeading = ({ children, textAlignCenter }: Props) => {
  return (
    <Heading
      fontSize={28}
      mb={6}
      color="#79A9CD"
      textAlign={textAlignCenter ? "center" : "left"}
    >
      {children}
    </Heading>
  );
};

export default BodyHeading;
