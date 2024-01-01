import { Box } from "@chakra-ui/react";

type Props = {
  children: any;
  screenSizeParameter: boolean;
  alignItemsCenter: boolean;
  gapSize?: number;
  justifyContentCenter?: boolean;
  maxWidthSize?: string;
};

const Section = ({
  children,
  screenSizeParameter,
  alignItemsCenter,
  justifyContentCenter,
  gapSize,
  maxWidthSize,
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
      justifyContent="center"
      flexDirection={screenSizeParameter ? "row" : "column"}
      maxW={maxWidthSize || "100%"}
    >
      {children}
    </Box>
  );
};

export default Section;
