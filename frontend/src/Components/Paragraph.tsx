import { Text } from "@chakra-ui/react";

type Props = {
  children: string;
  textAlignCenter?: boolean;
  maxWidthSize?: string;
  flexWeight?: number;
  margin?: boolean;
  bold?: boolean;
};

const Paragraph = ({
  children,
  textAlignCenter,
  maxWidthSize,
  flexWeight,
  margin = true,
  bold,
}: Props) => {
  return (
    <Text
      color="#45446A"
      mb={margin ? 4 : 0}
      textAlign={textAlignCenter ? "center" : "left"}
      maxW={maxWidthSize}
      flex={flexWeight}
      fontWeight={bold ? "600" : "500"}
    >
      {children}
    </Text>
  );
};

export default Paragraph;
