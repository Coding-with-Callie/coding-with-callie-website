import { Box } from "@chakra-ui/react";

type Props = {
  children: any;
  screenSizeParameter: boolean;
  alignItemsCenter: boolean;
  gapSize?: number;
  maxWidthSize?: string;
  direction?: "row" | "column";
};

const Section = ({
  children,
  screenSizeParameter,
  alignItemsCenter,
  gapSize,
  maxWidthSize,
  direction,
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
      flexDirection={direction || "column"}
      maxW={maxWidthSize || "100%"}
    >
      {children}
    </Box>
  );
};

export default Section;
