import { Text } from "@chakra-ui/react";

type Props = {
  children: string;
  textAlignCenter?: boolean;
  maxWidthSize?: string;
  flexWeight?: number;
  margin?: boolean;
  bold?: boolean;
  italic?: boolean;
};

const Paragraph = ({
  children,
  textAlignCenter,
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
      textAlign={textAlignCenter ? "center" : "left"}
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
