import { Box, FormControl, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
import TextInput from "../Components/Forms/TextInput";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";
import { isInvalidName } from "../helpers/helpers";
import TextAreaInput from "../Components/Forms/TextAreaInput";
import RatingInput from "../Components/Forms/RatingInput";

const thankYouMessage = ["Thank you for your review!"];

const Reviews = () => {
  const context: Context = useOutletContext();
  const [rating, setRating] = useState<null | number>(null);
  const [reviewFormData, setReviewFormData] = useState<any>({
    rating: rating,
    course: "Todo List",
    comments: "",
    displayName: context.user.name,
    session: 1,
    userId: context.user.id,
  });
  const [submitClicked, setSubmitClicked] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [invalidDisplayName, setInvalidDisplayName] = useState(
    isInvalidName(reviewFormData.displayName)
  );
  const [reviews, setReviews] = useState([]);

  const onSubmit = () => {
    setInvalidDisplayName(isInvalidName(reviewFormData.displayName));

    if (isInvalidName(reviewFormData.displayName)) {
      setSubmitClicked(true);
    } else {
      setFormSent(true);
      const token = localStorage.getItem("token");
      axios
        .post(
          `${
            process.env.REACT_APP_API || "http://localhost:3001/api"
          }/auth/submit-review`,
          reviewFormData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response.data);
          setReviews(response.data);
        });
    }
  };

  useEffect(() => {
    setReviewFormData({ ...reviewFormData, rating });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  const onChangeName = (e: any) => {
    setInvalidDisplayName(false);
    setReviewFormData({ ...reviewFormData, displayName: e.target.value });
  };

  const onChangeComments = (e: any) => {
    setReviewFormData({ ...reviewFormData, comments: e.target.value });
  };

  return (
    <Box>
      {reviews.map((review: any) => {
        return (
          <Box>
            <Text>{review.displayName}</Text>
            <Text>{review.rating}</Text>
            <Text>{review.course}</Text>
            <Text>{review.session}</Text>
            <Text>{review.comments}</Text>
          </Box>
        );
      })}
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading textAlignCenter={true}>
          Review Coding with Callie
        </BodyHeading>
        {formSent ? (
          <BodyText textBlocks={thankYouMessage} textAlignCenter={true} />
        ) : (
          <FormControl display="flex" flexDirection="column" gap={6}>
            <RatingInput rating={rating} setRating={setRating} />
            <TextInput
              field="Display Name"
              onChange={onChangeName}
              value={reviewFormData.displayName}
              isInvalid={submitClicked && invalidDisplayName}
            />
            <TextAreaInput
              field="Comments"
              onChange={onChangeComments}
              value={reviewFormData.comments}
              isInvalid={submitClicked}
            />
            <MyButton onClick={onSubmit}>Submit</MyButton>
          </FormControl>
        )}
      </Section>
    </Box>
  );
};

export default Reviews;
