import { Text } from "@chakra-ui/react";

type Props = {
  children: string;
  textAlignCenter?: boolean;
  maxWidthSize?: string;
  flexWeight?: number;
  margin?: boolean;
};

const Paragraph = ({
  children,
  textAlignCenter,
  maxWidthSize,
  flexWeight,
  margin = true,
}: Props) => {
  return (
    <Text
      color="#45446A"
      mb={margin ? 4 : 0}
      textAlign={textAlignCenter ? "center" : "left"}
      maxW={maxWidthSize}
      flex={flexWeight}
    >
      {children}
    </Text>
  );
};

export default Paragraph;
