import { Text } from "@chakra-ui/react";

type Props = {
  children: string;
  textAlign?: "left" | "center";
  maxWidthSize?: string;
  flexWeight?: number;
  margin?: boolean;
  bold?: boolean;
  italic?: boolean;
};

const Paragraph = ({
  children,
  textAlign = "left",
  maxWidthSize,
  flexWeight,
  margin = true,
  bold,
  italic,
}: Props) => {
  return (
    <Text
      color="#45446A"
      mb={margin ? 4 : 0}
      textAlign={textAlign}
      maxW={maxWidthSize}
      flex={flexWeight}
      fontWeight={bold ? "600" : "500"}
      fontStyle={italic ? "italic" : "normal"}
    >
      {children}
    </Text>
  );
};

export default Paragraph;
