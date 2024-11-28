import { Review } from "../../Pages/Reviews";
import UserReview from "./UserReview";

type Props = {
  reviews: Review[];
};

const ReviewList = ({ reviews }: Props) => {
  return (
    <>
      {reviews.map((review: any, index: number) => {
        return <UserReview review={review} index={index} />;
      })}
    </>
  );
};

export default ReviewList;
