import { Box, Text } from "@chakra-ui/react";

type Props = {
  textBlocks: string[];
  textAlign?: "center" | "left";
  mb?: number;
};

const BodyText = ({ textBlocks, textAlign = "left", mb = 4 }: Props) => {
  return (
    <Box flex={1}>
      {textBlocks.map((text: string, index: number) => {
        return (
          <Text textAlign={textAlign} key={index} mb={mb}>
            {text}
          </Text>
        );
      })}
    </Box>
  );
};

export default BodyText;
