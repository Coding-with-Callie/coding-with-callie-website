import { Box } from "@chakra-ui/react";

type Props = {
  children: any;
};

const CenteredColumn = ({ children }: Props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minH="100%"
      flex={1}
    >
      {children}
    </Box>
  );
};

export default CenteredColumn;
