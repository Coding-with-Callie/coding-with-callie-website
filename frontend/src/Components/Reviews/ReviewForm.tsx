import { Box, FormControl } from "@chakra-ui/react";
import Section from "../Section";
import BodyHeading from "../BodyHeading";
import RatingInput from "../Forms/RatingInput";
import TextAreaInput from "../Forms/TextAreaInput";
import TextInput from "../Forms/TextInput";
import MyButton from "../MyButton";
import { isInvalidName } from "../../helpers/helpers";
import { showNotification } from "../..";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../../helpers/axios_instances";

type User = {
  id: number;
  name: string;
};

type Props = {
  setReviews: React.Dispatch<React.SetStateAction<any>>;
  isLargerThan900: boolean;
  title?: string;
  user: User;
};

const ReviewForm = ({ setReviews, isLargerThan900, title, user }: Props) => {
  const [submitClicked, setSubmitClicked] = useState(false);
  const [rating, setRating] = useState<null | number>(null);
  const [reviewFormData, setReviewFormData] = useState<any>({
    rating: rating,
    comments: "",
    displayName: user.name,
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
      axiosPrivate.post("/submit-review", reviewFormData).then((response) => {
        setRating(null);
        setReviewFormData({
          rating: rating,
          comments: "",
          displayName: user.name,
          userId: user.id,
        });

        showNotification("Thank you for your review!", "success");
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
    <Box margin="0 auto" maxW={"600px"}>
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
          <MyButton onClick={onSubmit}>Submit</MyButton>
        </FormControl>
      </Section>
    </Box>
  );
};

export default ReviewForm;
