import { Box } from "@chakra-ui/react";

type Props = {
  children: any;
  maxW?: string;
};

const Section = ({ children, maxW = "100%" }: Props) => {
  return (
    <Box px={8} mt={20} mb={4} maxW={maxW}>
      {children}
    </Box>
  );
};

export default Section;
