import { Box, FormControl } from "@chakra-ui/react";
import Section from "../Section";
import BodyHeading from "../BodyHeading";
import RatingInput from "../Forms/RatingInput";
import TextAreaInput from "../Forms/TextAreaInput";
import TextInput from "../Forms/TextInput";
import MyButton from "../MyButton";
import { isInvalidName } from "../../helpers/helpers";
import { showNotification } from "../..";
import { useState } from "react";
import { axiosPrivate } from "../../helpers/axios_instances";
import { useOutletContext } from "react-router-dom";
import { Context } from "../../App";

type Props = {
  setReviews: React.Dispatch<React.SetStateAction<any>>;
};

const ReviewForm = ({ setReviews }: Props) => {
  const { user, catchError } = useOutletContext() as Context;

  const [submitClicked, setSubmitClicked] = useState(false);
  const [rating, setRating] = useState<null | number>(null);
  const [comments, setComments] = useState("");
  const [displayName, setDisplayName] = useState(user.name);

  const resetState = () => {
    setSubmitClicked(false);
    setRating(null);
    setComments("");
    setDisplayName(user.name);
  };

  const onSubmit = () => {
    if (isInvalidName(displayName) || rating === null) {
      setSubmitClicked(true);
      return;
    }

    axiosPrivate
      .post("/review", {
        rating,
        comments,
        displayName,
      })
      .then((response) => {
        resetState();

        showNotification("Thank you for your review!", "success");
        setReviews(response.data);
      })
      .catch((error) => {
        catchError(error);
      });
  };

  const onChangeName = (e: any) => {
    setDisplayName(e.target.value);
  };

  const onChangeComments = (e: any) => {
    setComments(e.target.value);
  };

  return (
    <Box margin="0 auto" maxW={"600px"}>
      <Section>
        <BodyHeading textAlign="center">Post Your Own Review</BodyHeading>
        <FormControl display="flex" flexDirection="column" gap={6}>
          <RatingInput
            rating={rating}
            setRating={setRating}
            isInvalid={submitClicked && rating === null}
          />
          <TextInput
            field="Display Name"
            onChange={onChangeName}
            value={displayName}
            isInvalid={submitClicked && isInvalidName(displayName)}
          />
          <TextAreaInput
            field="Comments"
            onChange={onChangeComments}
            value={comments}
          />
          <MyButton onClick={onSubmit}>Submit</MyButton>
        </FormControl>
      </Section>
    </Box>
  );
};

export default ReviewForm;
