import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Context } from "../../App";
import CustomForm from "../Forms/CustomForm";
import { reviewFormData } from "../../helpers/forms";

type Props = {
  setReviews: React.Dispatch<React.SetStateAction<any>>;
};

const ReviewForm = ({ setReviews }: Props) => {
  const { user } = useOutletContext() as Context;

  const initialState = {
    rating: null,
    comments: "",
    displayName: user.name,
  };
  const [formData, setFormData] = useState(initialState);

  return (
    <CustomForm
      form={reviewFormData}
      initialState={initialState}
      data={formData}
      setData={setFormData}
      axiosType={"private"}
      route={"/review"}
      message={"Thank you for your review!"}
      updateData={setReviews}
    />
  );
};

export default ReviewForm;
