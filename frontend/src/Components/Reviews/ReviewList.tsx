import { Box } from "@chakra-ui/react";
import { Review } from "../../Pages/Reviews";
import UserReview from "./UserReview";

type Props = {
  reviews: Review[];
};

const ReviewList = ({ reviews }: Props) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {reviews.map((review: any, index: number) => {
        return <UserReview review={review} index={index} />;
      })}
    </Box>
  );
};

export default ReviewList;
