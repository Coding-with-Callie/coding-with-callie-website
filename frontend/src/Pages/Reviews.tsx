import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import Section from "../Components/Section";
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
      <Section>
        <BodyHeading textAlign="center">Reviews</BodyHeading>
      </Section>
      <Section>
        {user.name && <ReviewForm setReviews={setReviews} user={user} />}
      </Section>
      <Section>
        <ReviewList reviews={reviews} />
      </Section>
    </Box>
  );
};

export default Reviews;
