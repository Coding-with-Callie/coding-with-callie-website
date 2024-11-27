import { Box } from "@chakra-ui/react";

type Props = {
  children: any;
  alignItems?: "center" | "left";
  gap?: number;
  maxW?: string;
  flexDirection?: "row" | "column";
};

const Section = ({
  children,
  alignItems = "center",
  gap,
  maxW = "100%",
  flexDirection = "column",
}: Props) => {
  return (
    <Box
      px={8}
      mt={20}
      mb={4}
      gap={gap}
      display="flex"
      alignItems={alignItems}
      justifyContent="center"
      flexDirection={flexDirection}
      maxW={maxW}
    >
      {children}
    </Box>
  );
};

export default Section;
