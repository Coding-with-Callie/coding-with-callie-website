import { Box } from "@chakra-ui/react";
import Paragraph from "./Paragraph";

type Props = {
  textBlocks: string[];
  textAlignCenter: boolean;
  widthSize?: string;
};

const BodyText = ({ textBlocks, textAlignCenter, widthSize }: Props) => {
  return (
    <Box flex={1}>
      {textBlocks.map((text: string) => {
        return (
          <Paragraph textAlignCenter={textAlignCenter} maxWidthSize={widthSize}>
            {text}
          </Paragraph>
        );
      })}
    </Box>
  );
};

export default BodyText;
