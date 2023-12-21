import { Text } from "@chakra-ui/react";

type Props = {
  children: string;
  textAlignCenter: boolean;
};

const Paragraph = ({ children, textAlignCenter }: Props) => {
  return (
    <Text
      color="#45446A"
      my={4}
      textAlign={textAlignCenter ? "center" : "left"}
      flex={1}
    >
      {children}
    </Text>
  );
};

export default Paragraph;
