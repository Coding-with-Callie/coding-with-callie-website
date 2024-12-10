import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import ReviewForm from "../Components/Reviews/ReviewForm";
import ReviewList from "../Components/Reviews/ReviewList";

export type Review = {
  comments: string;
  createdAt: Date;
  displayName: string;
  id: number;
  rating: number;
  user: any;
};

const Reviews = () => {
  const { user }: Context = useOutletContext();
  const data = useLoaderData() as Review[];

  const [reviews, setReviews] = useState(data);

  return (
    <Box>
      {user.name && <ReviewForm setReviews={setReviews} />}
      <ReviewList reviews={reviews} />
    </Box>
  );
};

export default Reviews;
