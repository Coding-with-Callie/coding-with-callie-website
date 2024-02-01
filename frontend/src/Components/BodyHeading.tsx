import { Heading } from "@chakra-ui/react";

type Props = {
  children: string;
  textAlignCenter: boolean;
  removeMargin?: boolean;
};

const BodyHeading = ({ children, textAlignCenter, removeMargin }: Props) => {
  return (
    <Heading
      fontSize={28}
      mb={!removeMargin ? 6 : 0}
      color="#79A9CD"
      textAlign={textAlignCenter ? "center" : "left"}
    >
      {children}
    </Heading>
  );
};

export default BodyHeading;
