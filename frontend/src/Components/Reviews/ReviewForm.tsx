import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react";
import Section from "../Section";
import BodyHeading from "../BodyHeading";
import RatingInput from "../Forms/RatingInput";
import TextAreaInput from "../Forms/TextAreaInput";
import TextInput from "../Forms/TextInput";
import MyButton from "../MyButton";
import { Submission } from "../Resources/SessionTask";
import { isInvalidName } from "../../helpers/helpers";
import { showNotification } from "../..";
import { useEffect, useState } from "react";
import { Context } from "../../App";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { User } from "../Profile/Admin";

type Props = {
  reviews: any[];
  setReviews: React.Dispatch<React.SetStateAction<any>>;
  isLargerThan900: boolean;
  sessionId?: number;
  title?: string;
  user: User;
};

const ReviewForm = ({
  reviews,
  setReviews,
  isLargerThan900,
  sessionId,
  title,
  user,
}: Props) => {
  const workshops = user.workshops;

  const [submitClicked, setSubmitClicked] = useState(false);
  const [rating, setRating] = useState<null | number>(null);
  const [reviewFormData, setReviewFormData] = useState<any>({
    rating: rating,
    workshopId: workshops[0].id,
    comments: "",
    displayName: user.name,
    session: sessionId || 1,
    userId: user.id,
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
          setRating(null);
          setReviewFormData({
            rating: rating,
            workshopId: workshops[0].id,
            comments: "",
            displayName: user.name,
            session: reviewFormData.session,
            userId: user.id,
          });
          if (numberOfReviews < response.data.length) {
            showNotification("Thank you for your review!", "success");
            setReviews(response.data);
          } else {
            showNotification(
              `You've already submitted a review for this session!`,
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

  const handleSelectWorkshopChange = (e: any) => {
    setReviewFormData({ ...reviewFormData, workshopId: e.target.value });
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
            <>
              <Box>
                <FormLabel layerStyle="input">Workshop</FormLabel>
                <Select
                  backgroundColor="#edf2f6"
                  color="#45446A"
                  onChange={handleSelectWorkshopChange}
                >
                  {workshops.map((workshop, index) => {
                    return (
                      <option value={workshop.id} key={index}>
                        {workshop.name}
                      </option>
                    );
                  })}
                </Select>
              </Box>
              <Box>
                <FormLabel layerStyle="input">Session</FormLabel>
                <Select
                  backgroundColor="#edf2f6"
                  color="#45446A"
                  value={reviewFormData.session}
                  onChange={handleSelectChange}
                >
                  {workshops[0].sessions.map((session, index) => {
                    const sessionSubmission = user.submissions.find(
                      (submission: Submission) =>
                        submission.session === index + 1
                    );

                    if (sessionSubmission)
                      return (
                        <option value={index + 1} key={index}>
                          {session.title}
                        </option>
                      );
                    return null;
                  })}
                </Select>
              </Box>
            </>
          )}
          <MyButton onClick={onSubmit}>Submit</MyButton>
        </FormControl>
      </Section>
    </Box>
  );
};

export default ReviewForm;
