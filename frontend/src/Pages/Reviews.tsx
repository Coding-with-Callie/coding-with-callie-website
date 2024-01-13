import { FormControl } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Context } from "../App";
import BodyHeading from "../Components/BodyHeading";
import BodyText from "../Components/BodyText";
import TextInput from "../Components/Forms/TextInput";
import MyButton from "../Components/MyButton";
import Section from "../Components/Section";
import { isInvalidComments, isInvalidName } from "../helpers/helpers";
import TextAreaInput from "../Components/Forms/TextAreaInput";
import StarRating from "../Components/Reviews/StarRating";

const thankYouMessage = ["Thank you for your review!"];

const Reviews = () => {
  const context: Context = useOutletContext();
  const [reviewFormData, setReviewFormData] = useState<any>({
    rating: "",
    course: "Todo List",
    comments: "",
    displayName: context.user.name,
  });
  const [submitClicked, setSubmitClicked] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [rating, setRating] = useState(0);
  const [invalidDisplayName, setInvalidDisplayName] = useState(
    isInvalidName(reviewFormData.displayName)
  );

  const onSubmit = () => {
    setInvalidDisplayName(isInvalidName(reviewFormData.displayName));

    if (isInvalidName(reviewFormData.displayName)) {
      setSubmitClicked(true);
    } else {
      setFormSent(true);
      // axios.post(
      //   `${process.env.REACT_APP_API || "http://localhost:3001/api"}/review`,
      //   reviewFormData
      // );
    }
  };

  const onChangeName = (e: any) => {
    setInvalidDisplayName(false);
    console.log("display name", e.target.value);
    setReviewFormData({ ...reviewFormData, displayName: e.target.value });
  };

  const onChangeComments = (e: any) => {
    console.log("comments", e.target.value);
    setReviewFormData({ ...reviewFormData, comments: e.target.value });
  };

  return (
    <Section screenSizeParameter={false} alignItemsCenter={false}>
      <BodyHeading textAlignCenter={true}>
        Review Coding with Callie
      </BodyHeading>
      {formSent ? (
        <BodyText textBlocks={thankYouMessage} textAlignCenter={true} />
      ) : (
        <FormControl display="flex" flexDirection="column" gap={6}>
          <StarRating
            rating={rating}
            setRating={setRating}
            count={5}
            size={undefined}
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
            isInvalid={submitClicked}
          />
          <MyButton onClick={onSubmit}>Submit</MyButton>
        </FormControl>
      )}
    </Section>
  );
};

export default Reviews;
