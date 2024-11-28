import { Avatar, Box, useMediaQuery, Text } from "@chakra-ui/react";
import { Review } from "../../Pages/Reviews";
import Paragraph from "../Paragraph";
import StarRating from "./StarRating";
import { format } from "date-fns";
import ReviewContainer from "./ReviewContainer";

type Props = {
  review: Review;
  index: number;
};

const UserReview = ({ review, index }: Props) => {
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");

  return (
    <ReviewContainer index={index}>
      <Box display="flex" gap={3}>
        {isLargerThan550 && (
          <Avatar src={review.user.photo} name={review.displayName} size="lg" />
        )}
        <Box w="100%" display="flex" flexDirection="column" gap={5}>
          <Box
            w="100%"
            display="flex"
            flexDirection="column"
            gap={2}
            h="64px"
            justifyContent="center"
          >
            <Box display="flex" justifyContent="space-between">
              <Text layerStyle="text" fontWeight="bold">
                {review.displayName}
              </Text>
              <Box display="flex" gap={3}>
                <StarRating
                  rating={review.rating}
                  setRating={undefined}
                  count={5}
                  isInvalid={false}
                />
                {isLargerThan550 && (
                  <Paragraph margin={false}>{`${review.rating}.0`}</Paragraph>
                )}
              </Box>
            </Box>
            <Text layerStyle="text" fontStyle="italic">
              {isLargerThan550
                ? format(review.createdAt, "MMMM do, yyyy")
                : format(review.createdAt, "MM-dd-yy")}
            </Text>
          </Box>
        </Box>
      </Box>
      {review.comments.length > 0 && (
        <Text layerStyle="text">{`"${review.comments}"`}</Text>
      )}
    </ReviewContainer>
  );
};

export default UserReview;
