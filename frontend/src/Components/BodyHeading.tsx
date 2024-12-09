import { Text } from "@chakra-ui/react";
import { blue } from "./theme";

type Props = {
  children: string;
  textAlign?: "center" | "left";
  mb?: number;
};

const BodyHeading = ({ children, textAlign = "left", mb = 6 }: Props) => {
  return (
    <Text
      fontSize={28}
      mb={mb}
      textAlign={textAlign}
      fontWeight={700}
      color={blue}
    >
      {children}
    </Text>
  );
};

export default BodyHeading;
