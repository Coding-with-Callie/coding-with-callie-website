import { Box } from "@chakra-ui/react";

type Props = {
  children: any;
  screenSizeParameter: boolean;
  alignItemsCenter: boolean;
  gapSize?: number;
};

const Section = ({
  children,
  screenSizeParameter,
  alignItemsCenter,
  gapSize,
}: Props) => {
  return (
    <Box
      px={8}
      mt={20}
      mb={4}
      gap={gapSize}
      display="flex"
      alignItems={
        alignItemsCenter ? "center" : screenSizeParameter ? "left" : "center"
      }
      flexDirection={screenSizeParameter ? "row" : "column"}
    >
      {children}
    </Box>
  );
};

export default Section;
