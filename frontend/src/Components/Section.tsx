import { Box } from "@chakra-ui/react";

type Props = {
  children: any;
  screenSizeParameter: boolean;
  alignItemsCenter: boolean;
};

const Section = ({
  children,
  screenSizeParameter,
  alignItemsCenter,
}: Props) => {
  return (
    <Box
      px={8}
      pt={20}
      pb={4}
      display="flex"
      gap={10}
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
