import { Box } from "@chakra-ui/react";
import Paragraph from "../Paragraph";

type Props = {
  feedback: any;
};

const FeedbackReceived = ({ feedback }: Props) => {
  return (
    <Box
      mb={4}
      display="flex"
      flexDirection="column"
      gap={4}
      border="1px solid #45446A"
      borderRadius={4}
      backgroundColor="white"
      p={4}
      boxShadow="lg"
    >
      <Box display="flex" gap={2}>
        <Paragraph bold margin={false}>
          Reviewer:
        </Paragraph>
        <Paragraph margin={false}>{feedback.user.username}</Paragraph>
      </Box>
      <Box>
        <Paragraph bold margin={false}>
          Positive Feedback:
        </Paragraph>
        <Paragraph margin={false}>{feedback.positiveFeedback}</Paragraph>
      </Box>
      <Box>
        <Paragraph bold margin={false}>
          Immediate Changes Requested:
        </Paragraph>
        <Paragraph margin={false}>
          {feedback.immediateChangesRequested}
        </Paragraph>
      </Box>
      <Box>
        <Paragraph bold margin={false}>
          Future Enhancements Requested:
        </Paragraph>
        <Paragraph margin={false}>
          {feedback.longTermChangesRequested}
        </Paragraph>
      </Box>
    </Box>
  );
};

export default FeedbackReceived;
