import { Avatar, Box, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import Section from "../Components/Section";
import Paragraph from "../Components/Paragraph";
import { format } from "date-fns";
import StarRating from "../Components/Reviews/StarRating";
import ReviewForm from "../Components/Reviews/ReviewForm";
import { sessions } from "../Components/Resources/sessions";

export type Review = {
  comments: string;
  course: string;
  createdAt: Date;
  displayName: string;
  id: number;
  rating: number;
  session: number;
};

const Reviews = () => {
  const context: Context = useOutletContext();
  const data = useLoaderData() as Review[];
  const [reviews, setReviews] = useState(data);
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");

  return (
    <Box>
      {(context.user && context.user?.submissions?.length > 0) ||
      (context.user && context.user.role === "admin") ? (
        <ReviewForm
          reviews={reviews}
          setReviews={setReviews}
          isLargerThan900={isLargerThan900}
        />
      ) : null}
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading textAlignCenter={true}>Reviews</BodyHeading>
        {reviews.length > 0 ? (
          reviews.map((review: any) => {
            return (
              <Box
                w={isLargerThan900 ? "65%" : "100%"}
                display="flex"
                flexDirection="column"
                mb={20}
                gap={3}
                border="1px solid #45446A"
                borderRadius={4}
                backgroundColor="white"
                p={4}
                boxShadow="lg"
              >
                <Box display="flex" gap={3}>
                  {isLargerThan550 ? (
                    <Avatar
                      src={review.user.photo}
                      name={review.displayName}
                      size="lg"
                      border="1px solid #45446A"
                    />
                  ) : null}
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
                        <Paragraph margin={false} bold>
                          {review.displayName}
                        </Paragraph>
                        <Box display="flex" gap={3}>
                          <StarRating
                            rating={review.rating}
                            setRating={undefined}
                            count={5}
                            isInvalid={false}
                          />
                          {isLargerThan550 ? (
                            <Paragraph
                              margin={false}
                            >{`${review.rating}.0`}</Paragraph>
                          ) : null}
                        </Box>
                      </Box>
                      <Box display="flex" gap={isLargerThan550 ? 0 : 3}>
                        <Paragraph margin={false} italic={true}>
                          {isLargerThan550
                            ? format(review.createdAt, "MMMM do, yyyy")
                            : format(review.createdAt, "MM-dd-yy")}
                        </Paragraph>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" flexDirection="column" gap={3}>
                  <Paragraph margin={false} textAlignCenter={true}>{`${
                    review.course
                  } Workshop: ${
                    sessions[review.session - 1].title
                  }`}</Paragraph>
                  {review.comments.length > 0 ? (
                    <Paragraph
                      margin={false}
                    >{`"${review.comments}"`}</Paragraph>
                  ) : null}
                </Box>
              </Box>
            );
          })
        ) : (
          <Paragraph margin={false}>
            Coding with Callie hasn't been reviewed yet!
          </Paragraph>
        )}{" "}
      </Section>
    </Box>
  );
};

export default Reviews;
