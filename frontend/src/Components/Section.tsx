import { Box } from "@chakra-ui/react";

type Props = {
  children: any;
  screenSizeParameter: boolean;
  alignItemsCenter: boolean;
  gapSize?: number;
  justifyContentCenter?: boolean;
};

const Section = ({
  children,
  screenSizeParameter,
  alignItemsCenter,
  justifyContentCenter,
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
      justifyContent="center"
      flexDirection={screenSizeParameter ? "row" : "column"}
    >
      {children}
    </Box>
  );
};

export default Section;
