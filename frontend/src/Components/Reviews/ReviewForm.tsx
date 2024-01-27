import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react";
import Section from "../Section";
import BodyHeading from "../BodyHeading";
import RatingInput from "../Forms/RatingInput";
import TextAreaInput from "../Forms/TextAreaInput";
import TextInput from "../Forms/TextInput";
import MyButton from "../MyButton";
import { Submission } from "../Resources/SessionTask";
import { sessions } from "../Resources/sessions";
import { isInvalidName } from "../../helpers/helpers";
import { showNotification } from "../..";
import { useEffect, useState } from "react";
import { Context } from "../../App";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

type Props = {
  reviews: any[];
  setReviews: React.Dispatch<React.SetStateAction<any>>;
  isLargerThan900: boolean;
  sessionId?: number;
  title?: string;
};

const ReviewForm = ({
  reviews,
  setReviews,
  isLargerThan900,
  sessionId,
  title,
}: Props) => {
  const context: Context = useOutletContext();

  const [submitClicked, setSubmitClicked] = useState(false);
  const [rating, setRating] = useState<null | number>(null);
  const [reviewFormData, setReviewFormData] = useState<any>({
    rating: rating,
    course: "Todo List",
    comments: "",
    displayName: context.user.name,
    session: sessionId,
    userId: context.user.id,
  });
  const [invalidDisplayName, setInvalidDisplayName] = useState(
    isInvalidName(reviewFormData.displayName)
  );

  const onSubmit = () => {
    setInvalidDisplayName(isInvalidName(reviewFormData.displayName));
    if (isInvalidName(reviewFormData.displayName) || rating === null) {
      setSubmitClicked(true);
      showNotification("Please enter all the necessary information", "error");
    } else {
      setRating(null);
      setReviewFormData({
        rating: rating,
        course: "Todo List",
        comments: "",
        displayName: context.user.name,
        session: reviewFormData.session,
        userId: context.user.id,
      });
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
            showNotification("Thank you for your review!", "success");
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
    <Box margin="0 auto" w={isLargerThan900 ? "65%" : "100%"}>
      <Section screenSizeParameter={false} alignItemsCenter={false}>
        <BodyHeading textAlignCenter={true}>
          {title || "Post Your Own Review"}
        </BodyHeading>
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
          {sessionId ? null : (
            <Box>
              <FormLabel layerStyle="input">Workshop Session</FormLabel>

              <Select
                backgroundColor="#edf2f6"
                color="#45446A"
                value={reviewFormData.session}
                onChange={handleSelectChange}
              >
                {sessions.map((session, index) => {
                  const sessionSubmissions = context.user.submissions.filter(
                    (submission: Submission) => {
                      if (submission.session === index + 1) {
                        return submission;
                      } else {
                        return null;
                      }
                    }
                  );

                  if (
                    sessionSubmissions.length > 0 ||
                    context.user.role === "admin"
                  ) {
                    return <option value={index + 1}>{session.title}</option>;
                  } else {
                    return null;
                  }
                })}
              </Select>
            </Box>
          )}
          <MyButton onClick={onSubmit}>Submit</MyButton>
        </FormControl>
      </Section>
    </Box>
  );
};

export default ReviewForm;
