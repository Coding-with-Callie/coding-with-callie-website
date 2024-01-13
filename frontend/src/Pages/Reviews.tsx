import {
  Avatar,
  Box,
  FormControl,
  FormLabel,
  Select,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
import TextInput from "../Components/Forms/TextInput";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";
import { isInvalidName } from "../helpers/helpers";
import TextAreaInput from "../Components/Forms/TextAreaInput";
import RatingInput from "../Components/Forms/RatingInput";
import Paragraph from "../Components/Paragraph";
import { format } from "date-fns";
import StarRating from "../Components/Reviews/StarRating";
import { sessions } from "../Components/Resources/sessions";
import { Submission } from "./Profile";
import { showNotification } from "..";

const thankYouMessage = ["Thank you for your review!"];

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
  const [reviews, setReviews] = useState(data);
  const [isLargerThan900] = useMediaQuery("(min-width: 900px)");
  const [isLargerThan550] = useMediaQuery("(min-width: 550px)");

  const onSubmit = () => {
    setInvalidDisplayName(isInvalidName(reviewFormData.displayName));
    if (isInvalidName(reviewFormData.displayName) || rating === null) {
      setSubmitClicked(true);
      showNotification("Please enter all the necessary information", "error");
    } else {
      setFormSent(true);
      const token = localStorage.getItem("token");
      const numberOfReviews = reviews.length;
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
          if (numberOfReviews < response.data.length) {
            setReviews(response.data);
          } else {
            showNotification(
              `You've already submitted a review for session ${reviewFormData.session}!`,
              "error"
            );
          }
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

  const handleSelectChange = (e: any) => {
    setReviewFormData({ ...reviewFormData, session: e.target.value });
  };

  return (
    <Box>
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
                  <Paragraph margin={false}>{`"${review.comments}"`}</Paragraph>
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
      {context.user?.submissions?.length > 0 ? (
        <Box margin="0 auto" w={isLargerThan900 ? "65%" : "100%"}>
          <Section screenSizeParameter={false} alignItemsCenter={false}>
            <BodyHeading textAlignCenter={true}>
              Post Your Own Review
            </BodyHeading>
            {formSent ? (
              <BodyText textBlocks={thankYouMessage} textAlignCenter={true} />
            ) : (
              <FormControl display="flex" flexDirection="column" gap={6}>
                <RatingInput
                  rating={rating}
                  setRating={setRating}
                  isInvalid={submitClicked && rating === null}
                />
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
                  isInvalid={false}
                />
                <Box>
                  <FormLabel layerStyle="input">Workshop Session</FormLabel>
                  <Select
                    backgroundColor="#edf2f6"
                    color="#45446A"
                    onChange={handleSelectChange}
                  >
                    {sessions.map((session, index) => {
                      const sessionSubmissions =
                        context.user.submissions.filter(
                          (submission: Submission) => {
                            if (submission.session === index + 1) {
                              return submission;
                            } else {
                              return null;
                            }
                          }
                        );

                      if (sessionSubmissions.length > 0) {
                        return (
                          <option value={index + 1}>{session.title}</option>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </Select>
                </Box>
                <MyButton onClick={onSubmit}>Submit</MyButton>
              </FormControl>
            )}
          </Section>
        </Box>
      ) : null}
    </Box>
  );
};

export default Reviews;
