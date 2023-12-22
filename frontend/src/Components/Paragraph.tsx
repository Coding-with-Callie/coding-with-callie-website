import { Text } from "@chakra-ui/react";

type Props = {
  children: string;
  textAlignCenter: boolean;
  widthSize?: string;
};

const Paragraph = ({ children, textAlignCenter, widthSize }: Props) => {
  return (
    <Text
      color="#45446A"
      mb={4}
      textAlign={textAlignCenter ? "center" : "left"}
      maxW={widthSize}
    >
      {children}
    </Text>
  );
};

export default Paragraph;
