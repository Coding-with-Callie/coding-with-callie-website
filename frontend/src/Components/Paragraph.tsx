import { Text } from "@chakra-ui/react";

type Props = {
  text: string;
};

const Paragraph = ({ text }: Props) => {
  return (
    <Text fontSize={14} color="#45446A" my={4}>
      {text}
    </Text>
  );
};

export default Paragraph;
