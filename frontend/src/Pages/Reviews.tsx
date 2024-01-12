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
import { isInvalidName } from "../helpers/helpers";

const thankYouMessage = ["Thank you for your review!"];

const Reviews = () => {
  const context: Context = useOutletContext();
  const [reviewFormData, setReviewFormData] = useState<any>({
    rating: "",
    course: "Todo List",
    review: "",
    displayName: context.user.name,
  });
  const [submitClicked, setSubmitClicked] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [invalidName, setInvalidName] = useState(
    isInvalidName(reviewFormData.name)
  );

  const onSubmit = () => {
    setInvalidName(isInvalidName(reviewFormData.name));

    if (isInvalidName(reviewFormData.name)) {
      setSubmitClicked(true);
    } else {
      setFormSent(true);
      axios.post(
        `${process.env.REACT_APP_API || "http://localhost:3001/api"}/review`,
        reviewFormData
      );
    }
  };

  const onChangeName = (e: any) => {
    setInvalidName(false);
    setReviewFormData({ ...reviewFormData, name: e.target.value });
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
          <TextInput
            field="Name"
            onChange={onChangeName}
            value={reviewFormData.name}
            isInvalid={submitClicked && invalidName}
          />
          <MyButton onClick={onSubmit}>Submit</MyButton>
        </FormControl>
      )}
    </Section>
  );
};

export default Reviews;
