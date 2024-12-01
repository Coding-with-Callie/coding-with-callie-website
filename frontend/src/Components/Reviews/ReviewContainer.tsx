import { Box } from "@chakra-ui/react";
import Section from "../Section";

type Props = {
  children: React.ReactNode;
  index: number;
};

const ReviewContainer = ({ children, index }: Props) => {
  return (
    <Box w="100%">
      <Section>{children}</Section>
    </Box>
  );
};

export default ReviewContainer;
