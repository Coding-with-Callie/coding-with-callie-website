import { Text } from "@chakra-ui/react";
import { heading } from "./theme";

type Props = {
  children: string;
  textAlign?: "center" | "left";
  mb?: number;
  fontSize?: number;
};

const BodyHeading = ({
  children,
  textAlign = "left",
  mb = 2,
  fontSize = 24,
}: Props) => {
  return (
    <Text
      fontSize={fontSize}
      mb={mb}
      textAlign={textAlign}
      fontWeight={700}
      color={heading}
    >
      {children}
    </Text>
  );
};

export default BodyHeading;
